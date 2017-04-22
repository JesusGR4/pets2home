import { Component, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../models/session";
import {ApiConfigService} from "../services/apiConfig.service";
import {UsersService} from "../services/users.service";
import {CodesService} from "../services/codes.service";
import {MessagesService} from "../services/messages.service";
import {SessionsService} from "../services/sessions.service";
import {TranslateService} from "ng2-translate";
declare var FooterReveal: any;
declare var $: any;
declare var window: any;
declare var SpainMap: any;

@Component({
    selector: "web",
    templateUrl: "./web.component.html"
})
export class WebComponent{
    @Output()
    public session: Session = null;


    constructor(
        private router: Router,
        public _sessionsServices: SessionsService,
        public _messagesService: MessagesService,
        private translate: TranslateService
    ){
      translate.addLangs(["sp", "en"]);
      if(localStorage.getItem(ApiConfigService.LANGUAGE)==null){
        translate.use('sp');
      }else{
        translate.use(localStorage.getItem(ApiConfigService.LANGUAGE));
      }

    }
    ngOnInit(){
        this.session = ApiConfigService.getSessionByLocalStorage();

    }
    setLanguage(language){
      this.translate.use(language);
      localStorage.setItem(ApiConfigService.LANGUAGE, language);
    }
    ngAfterViewInit() {
        FooterReveal($,window);
    }

    onLogin($event){
        this.session = ApiConfigService.getSessionByLocalStorage();
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

    onLogout(){
        this._sessionsServices.logout();
        location.reload();
    }


}
