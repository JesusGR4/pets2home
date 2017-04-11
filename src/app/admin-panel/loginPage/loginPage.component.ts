import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {SessionsService} from "../../services/sessions.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
declare const FB:any;

@Component({
    selector: "login-page-component",
    templateUrl: "./loginPage.component.html",

})
export class LoginPageComponent{
    public session: {email?: string, password?: string} = {};
    public user:{fb_id?:string, email?:string,name?:string, surnames?:string} = {};
    public send: boolean = false;
    constructor(
        private _sessionsService: SessionsService,
        private _messagesService: MessagesService,
        private router: Router
    ){
        FB.init({
            appId      : '245068015937234',
            cookie     : false,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.5
        });

    }

    onLogin(form){
        this.send = true;
        if(form.valid){
            this._sessionsService.login(this.session, 1).subscribe(
                res => {
                    let json = res.json();
                    let code = json.code;
                    let data = json.data;
                    if(code == CodesService.OK_CODE) {
                        ApiConfigService.setSession(data, json.token.token);
                        this.router.navigate(['/admin-panel/dashboard']);
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

    onFacebookLoginClick() {
        FB.login((response:any) => {
            console.log(response);
            let token:string = response['authResponse']['accessToken'];
            FB.api('/me',{access_token: token},{fields: ['email,first_name,last_name']}, (response: any) =>  {
                this.user = {fb_id: response['id'],email: response['email'], name: response['first_name'], surnames: response['last_name']};
                this._sessionsService.loginOrRegistration(this.user,1).subscribe(
                    res => {
                        let json = res.json();
                        let code = json.code;
                        let message = json.message;
                        let data = json.data;
                        if(code == CodesService.OK_CODE) {
                            ApiConfigService.setSession(data, json.token.token);
                            this.router.navigate(['/admin-panel/dashboard']);
                        }else{
                            this.handlerError(code, message);
                        }
                    },
                    error => {
                        let errorMessage = <any>error;

                        if(errorMessage !== null){
                            this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                        }
                    }
                );
            });
        },{scope: 'email'});
    }


    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {

        }else {

        }
    };
    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
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
