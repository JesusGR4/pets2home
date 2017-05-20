import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {SessionsService} from "../../services/sessions.service";
import {UsersService} from "../../services/users.service";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {User} from "../../models/user";

@Component({
    selector: "modal-login-component",
    templateUrl: "./modalLogin.component.html",

})
export class ModalLoginComponent {
    public login:{email?:string, password?: string} = {};
    public email:{email?:string} = {};
    public user:{email?:string,name?:string, surnames?:string, password?: string} = {};
    public sendLogin: boolean = false;
    public sendRegister: boolean = false;
    public sendRecovery: boolean = false;

    @Output()
    onLoginEvent: EventEmitter<any> = new EventEmitter();

    constructor(
        private _sessionsService: SessionsService,
        private _messagesService: MessagesService,
        private _usersService: UsersService
    ){
    }

    onLogin(form){
        this.sendLogin = true;
        if(form.valid){
            this._sessionsService.login(this.login,0).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    let data = json.data;
                    if(code == CodesService.OK_CODE) {
                        ApiConfigService.setSession(data, json.token.token);
                        this.triggerOnLoginEvent(data);
                    }else{
                        let message = json.message;
                        this.handlerError(code, message);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    onRegister(form){
        this.sendRegister = true;
        if(form.valid){
            this._usersService.register(this.user).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    if(code == CodesService.OK_CODE) {
                        this._messagesService.showSuccessMessage('Te has registrado correctamente. En breve recibirás un' +
                            ' correo de activación de cuenta')
                    }else{
                        let message = json.message;
                        this.handlerError(code, message);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    onPasswordRecovery(form){
        this.sendRecovery = true;
        if(form.valid){
            this._usersService.passwordRecovery(this.email).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    if(code == CodesService.OK_CODE) {
                        this._messagesService.showSuccessMessage('')
                    }else{
                        let message = json.message;
                        this.handlerError(code, message);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }else if(code == CodesService.FAILED_VALIDATOR_CODE){
            message = MessagesService.FAILED_VALIDATOR_CODE_MESSAGE;
        }else if(code == CodesService.INVALID_EMAIL){
            message = MessagesService.INVALID_EMAIL_MESSAGE;
        }else if(code == CodesService.SERVER_ERROR_CODE){
            message = MessagesService.SERVER_ERROR_CODE_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

    triggerOnLoginEvent($event) : void {
        this.onLoginEvent.emit($event);
    }

}
