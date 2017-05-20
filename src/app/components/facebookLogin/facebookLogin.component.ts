import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";
import {SessionsService} from "../../services/sessions.service";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {MessagesService} from "../../services/messages.service";


declare const FB:any;

@Component({
    selector: 'facebook-login-component',
    templateUrl: './facebookLogin.component.html',
})
export class FacebookLoginComponent implements OnInit {
    public user:{fb_id?:string, email?:string,name?:string, surnames?:string, token?:string} = {};

    @Output()
    onLoginEvent : EventEmitter<any> = new EventEmitter();

    constructor(
        public _sessionsService: SessionsService,
        public _messagesService: MessagesService
    ) {
        FB.init({
            appId      : '245068015937234',
            cookie     : false,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
        FB.login((response:any) => {
            console.log(response['authResponse']['accessToken']);
            let token:string = response['authResponse']['accessToken'];
            FB.api('/me',{access_token: token},{fields: ['email,first_name,last_name']}, (response: any) =>  {
                this.user = {fb_id: response['id'],email: response['email'], name: response['first_name'], surnames: response['last_name'], token: token};
                this._sessionsService.loginOrRegistration(this.user,0).subscribe(
                    res => {
                        let json = res.json();
                        let code = json.code;
                        let message = json.message;
                        let data = json.data;
                        if(code == CodesService.OK_CODE) {
                            ApiConfigService.setSession(data, json.token.token);
                            location.reload();
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
        },{scope: 'email,user_relationships,user_birthday,user_hometown,user_likes,user_religion_politics,user_location,'+
        'user_education_history,user_work_history,public_profile'});
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
        }
        this._messagesService.showErrorMessage(message);
    }

}
