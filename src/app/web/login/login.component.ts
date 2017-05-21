import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {SessionsService} from "../../services/sessions.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
declare const FB:any;
declare var window: any;
@Component({
    selector: "login",
    templateUrl: "./login.component.html",

})
export class LoginComponent{
    public session: {email?: string, password?: string} = {};
    public send: boolean = false;
    public remember: {email?: string} = {};
    constructor(
        private _sessionsService: SessionsService,
        private _messagesService: MessagesService,
        private router: Router
    ){

    }

    ngOnInit(){
      this.send = false;
      $('html,body').animate({
          scrollTop: $("#login").offset().top},
        'slow');
    }
    onLogin(form){
        this.send = true;
        if(form.valid){
            this._sessionsService.login(this.session,1).subscribe(
                res => {
                    let json = res.json();
                    let code = json.code;
                    let data = json.data;
                    if(code == CodesService.OK_CODE) {
                        ApiConfigService.setSession(data, json.token.token);
                        if(data.role_id ==1){
                          window.location.href = '/admin-panel/dashboard';
                        }
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

    rememberPassword(email){

      this._sessionsService.resetPassword(email).subscribe(

        res => {
          let json = res.json();
          let code = json.code;
          let data = json.data;
          if(code == CodesService.OK_CODE) {
            console.log('sent');
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
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }else if(code == CodesService.SERVER_ERROR_CODE){
            message = MessagesService.SERVER_ERROR_CODE_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

}
