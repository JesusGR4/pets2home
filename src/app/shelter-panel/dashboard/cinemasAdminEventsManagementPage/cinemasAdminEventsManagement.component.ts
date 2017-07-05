import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";
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
    selector: "cinemasAdminEventsManagement",
    templateUrl: "./cinemasAdminEventsManagement.component.html",

})
export class CinemasAdminEventsManagement {

    public session: Session;

    public activeEvents: Event[];
    public completedEvents: Event[];
    public canceledEvents: Event[];

    public activeTab = "active";

    public events: Event[];
    public event: Event = new Event;

    public cinemas: Cinema[];
    public activeCinemaSelected: number = 0;
    public completedCinemaSelected: number = 0;
    public canceledCinemaSelected: number = 0;
    //public filteredCity: City[];

    public filter: {cinema_id?: number[], city_id?: number[], start_date?: Date, end_date?: Date} = {};

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
        }else if(this.session.profile != ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getActiveEventsList(null);
            this.getCompletedEventsList(null);
            this.getCanceledEventsList(null);
            this.getCinemaList(null);
        }
    }

    ngAfterViewInit() {
        TableJS($, window);
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }
    }
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

    filterActives(){
        let filter = {"cinema_id":undefined};
        if(this.activeCinemaSelected != 0 && this.activeCinemaSelected != undefined){
            filter.cinema_id = this.activeCinemaSelected;
        }

        this.getActiveEventsList(filter);
    }

    getActiveEventsList(filter) : void{
        this._eventsService.getActiveList(filter, ProfilesService.CINEMAS_ADMIN_PROFILE_ID).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.activeEvents = json.data;
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

    filterCompleted(){
        let filter = {"cinema_id":undefined};
        if(this.completedCinemaSelected != 0 && this.completedCinemaSelected != undefined){
            filter.cinema_id = this.completedCinemaSelected;
        }
        this.getCompletedEventsList(filter);
    }

    getCompletedEventsList(filter) : void{
        this._eventsService.getCompletedList(filter, ProfilesService.CINEMAS_ADMIN_PROFILE_ID).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.completedEvents = json.data;
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

    filterCanceled(){
        let filter = {"cinema_id":undefined};
        if(this.canceledCinemaSelected != 0 && this.canceledCinemaSelected != undefined){
            filter.cinema_id = this.canceledCinemaSelected;
        }
        this.getCanceledEventsList(filter);
    }

    getCanceledEventsList(filter) : void{
        this._eventsService.getCanceledList(filter, ProfilesService.CINEMAS_ADMIN_PROFILE_ID).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.canceledEvents = json.data;
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

    changeActive(){
        this.activeTab = "active";
    }

    changeCompleted(){
        this.activeTab = "completed";
    }

    changeCanceled(){
        this.activeTab = "canceled";
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