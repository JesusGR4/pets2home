import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {CodesService} from "../../../services/codes.service";
import {ProfilesService} from "../../../services/profiles.service";
import {MessagesService} from "../../../services/messages.service";
import {EventsService} from "../../../services/events.service";
import {Event} from "../../../models/event";
import {Session} from "../../../models/session";

declare var TableJS:any;
declare var multiSelectJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "myEvents",
    templateUrl: "./myEvents.component.html",

})
export class MyEvents {

    public session: Session;

    public events: Event[];
    
    constructor(
        private router: Router,
        private _eventsService: EventsService,
        private _messagesService: MessagesService
    ) {

    }
    
    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID &&
                this.session.profile != ProfilesService.PROVIDER_PROFILE_ID && this.session.profile != ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getUserEventsList();
        }
    }

    ngAfterViewInit() {
        TableJS($, window);
        multiSelectJS($, window);
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID &&
            this.session.profile != ProfilesService.PROVIDER_PROFILE_ID && this.session.profile != ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }
    }

    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

    getUserEventsList() : void{
        this._eventsService.getUserPromotedList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.events = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            })
        ;
    }

}