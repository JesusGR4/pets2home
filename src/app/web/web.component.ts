import {Component, Output, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../models/session";
import {ApiConfigService} from "../services/apiConfig.service";
import {UsersService} from "../services/users.service";
import {CodesService} from "../services/codes.service";
import {MessagesService} from "../services/messages.service";
import {SessionsService} from "../services/sessions.service";
import {TranslateService} from "ng2-translate";
import {ShelterService} from "../services/shelter.service";
declare var FooterReveal2: any;
declare var $: any;
declare var window: any;
declare var SpainMap: any;
declare var paypal: any;
@Component({
    selector: "web",
    templateUrl: "./web.component.html",
  providers: [ShelterService]
})

export class WebComponent implements OnInit{
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
        localStorage.setItem(ApiConfigService.LANGUAGE, 'sp');
      }else{
        translate.use(localStorage.getItem(ApiConfigService.LANGUAGE));
      }

    }

    ngOnInit(){
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.profile ==1){
          window.location.href = '/admin-panel/dashboard';
        }
    }

    setLanguage(language){
      this.translate.use(language);
      localStorage.setItem(ApiConfigService.LANGUAGE, language);
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

  completeUrl(url: string) {
    return ApiConfigService.PROFILE_IMAGE_FOLDER + url;
  }
}
