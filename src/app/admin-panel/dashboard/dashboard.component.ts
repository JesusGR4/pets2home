import { Component, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import {SessionsService} from "../../services/sessions.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {Session} from "../../models/session";
import {ApiConfigService} from "../../services/apiConfig.service";

declare var MyJS: any;
declare var $: any;
declare var window: any;

@Component({
    selector: "dashboard-component",
    templateUrl: "./dashboard.component.html",
    providers: [SessionsService]

})
export class DashboardComponent{
    public session: Session = null;
    constructor(
        private router: Router,
        private _sessionsService: SessionsService,
        private _messagesService: MessagesService
    ){
        _sessionsService.user$.subscribe(
          user => {
              this.session = user;
              ApiConfigService.setSession(user,null)
          }
        );
    }

    ngOnInit(){
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null || this.session.profile == 1){
            this.router.navigate(['/admin-panel/loginPage']);
        }
    }

    ngAfterViewInit() {
        MyJS($,window);
    }

    logout(){
        this._sessionsService.logout().subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                if(code == CodesService.OK_CODE) {
                    this.router.navigate(['/admin-panel/loginPage']);
                }else{
                    this.handlerError(code);
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

    private handlerError(code){
        let message = "";
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }else if(code == CodesService.SERVER_ERROR_CODE){
            message = MessagesService.SERVER_ERROR_CODE_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

}