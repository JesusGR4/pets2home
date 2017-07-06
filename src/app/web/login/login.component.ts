import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {SessionsService} from "../../services/sessions.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from "ng2-translate";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
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
    public errorMessages: any;
    @ViewChild('modal')
    public modal: ModalComponent;
    public translation: string;
    public valid: boolean;
    constructor(
        private _sessionsService: SessionsService,
        private _messagesService: MessagesService,
        private router: Router,
        private translateService:TranslateService,
        private toastyService:ToastyService
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
                let rout = this.router;
                if(code == CodesService.OK_CODE){
                  this.translateService.get('LOGIN.SUCCESS').subscribe(
                    data => {
                      this.translation = data;
                    }
                  );
                  var toastOptions:ToastOptions = {
                    title: this.translation,
                    msg: json.message,
                    showClose: true,
                    timeout: 3000,
                    theme: 'material',
                    onRemove: function(toast: ToastData){
                      rout.navigateByUrl('/login');
                    }
                  };
                  this.toastyService.success(toastOptions);
                          ApiConfigService.setSession(data, json.token.token);
                          if(data.role_id ==1){
                            window.location.href = '/admin-panel/dashboard';
                          }else{
                            window.location.href = '/index';
                          }
                }else{
                  this.errorMessages = json.message;
                  this.modal.open();
                }
              },
              error => {
                let json = error.json();
                this.errorMessages = json.message;
                this.modal.open();
              }

            )
        }
    }

    rememberPassword(email){

      this._sessionsService.resetPassword(email).subscribe(
          res => {
            let json = res.json();
            let code = json.code;

            if(code == CodesService.OK_CODE){
              this.translateService.get('REMEMBER.SUCCESS').subscribe(
                data => {
                  this.translation = data;
                }
              );
              var toastOptions:ToastOptions = {
                title: this.translation,
                msg: json.message,
                showClose: true,
                timeout: 3000,
                theme: 'material',

              };
              this.toastyService.success(toastOptions);
            }else{
              this.errorMessages = json.message;
              this.modal.open();
            }
          },
          error => {
            let json = error.json();
            this.errorMessages = json.message;
            this.modal.open();
          }
      )
    }

}
