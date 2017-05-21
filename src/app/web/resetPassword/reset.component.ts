import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {SessionsService} from "../../services/sessions.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
declare const FB:any;

@Component({
    selector: "reset",
    templateUrl: "./reset.component.html",

})
export class ResetComponent{
    public reset: {email?: string, password?: string, password_confirmation?: string, token?: string} = {};
    public send: boolean = false;

    constructor(
        private _sessionService: SessionsService,
        private _messageService: MessagesService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ){
      this.activatedRoute.params.subscribe((params: Params) => {
        let token = params['token'];
        this.reset.token = token;
      })
    }

  resetPass(form) {
    this.send = true;
    if (form.valid) {
      this._sessionService.resetForm(this.reset).subscribe(
        res => {
          let json = res.json();
          let code = json.code;
          let data = json.data;
          if (code == CodesService.OK_CODE) {
            this.router.navigateByUrl('/login');
          } else {
            let message = json.message;
            this.handlerError(code, message);
          }
        },
        error => {
          let errorMessage = <any>error;

          if (errorMessage !== null) {
            this._messageService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
          }
        }
      )
    }
  }
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }else if(code == CodesService.SERVER_ERROR_CODE){
            message = MessagesService.SERVER_ERROR_CODE_MESSAGE;
        }
        this._messageService.showErrorMessage(message);
    }

}
