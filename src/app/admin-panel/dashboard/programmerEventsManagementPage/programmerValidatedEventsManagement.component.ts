import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service"
import {ProfilesService} from "../../../services/profiles.service";
import {CinemasService} from "../../../services/cinemas.service";
import {Cinema} from "../../../models/cinema";
import {EventsService} from "../../../services/events.service";
import {Event} from "../../../models/event";
import {Session} from "../../../models/session";

declare var TableJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "programmerValidatedEventsManagement",
    templateUrl: "./programmerValidatedEventsManagement.component.html",

})
export class ProgrammerValidatedEventsManagement {

    public session: Session;

    public validatedEvents: Event[];

    public cinemas: Cinema[];
    public validatedCinemaSelected: number = 0;

    public filter: {cinema_id?: number[]} = {};

    constructor(
        private router: Router,
        private _eventsService: EventsService,
        private _messagesService: MessagesService,
        private _cinemasService: CinemasService
    ) {

    }

    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getValidatedEventsList(null);
            this.getCinemaList(null);
        }
    }

    ngAfterViewInit() {
        TableJS($, window);
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }
    }
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }


    filterValidated(){
        let filter = {"cinema_id":undefined};
        if(this.validatedCinemaSelected != 0 && this.validatedCinemaSelected != undefined){
            filter.cinema_id = this.validatedCinemaSelected;
        }
        this.getValidatedEventsList(filter);
    }

    getValidatedEventsList(filter) : void{
        this._eventsService.getValidatedList(filter, ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.validatedEvents = json.data;
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

    acceptEvent(event: Event){
        this._eventsService.acceptEventByProgrammer(event).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    event.accepted_by_programmer = 1;
                    this._messagesService.showSuccessMessage('El evento ha sido aceptado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
                error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    getCinemaList(filter) : void{
        this._cinemasService.getList(filter, true).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cinemas = this.transformForSelect2(json.data);
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

    private transformForSelect2(datas: Array<any>){
        let result = [];
        for(let i=0;i<datas.length; i++){
            let value = datas[i].id;
            let label = datas[i].name;
            if(datas[i].surnames != null){
                label = label + " " + datas[i].surnames;
            }
            result.push({value : value.toString(), label : label});
        }
        return result;
    }


}