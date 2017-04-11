import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";
import {CitiesService} from "../../../services/cities.service";
import {City} from "../../../models/city";
import {CinemasService} from "../../../services/cinemas.service";
import {Cinema} from "../../../models/cinema";
import {EventsService} from "../../../services/events.service";
import {Event} from "../../../models/event";
import {Session} from "../../../models/session";

declare var TableJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "pendingEventsManagement",
    templateUrl: "./pendingEventsManagement.component.html",

})
export class PendingEventsManagement {

    public session: Session;

    public pendingEvents: Event[];
    public validatedEvents: Event[];

    public activeTab = "pending";

    public events: Event[];
    public event: Event = new Event;

    public cities: City[];
    public pendingCinemaCitySelected: number = 0;
    public validatedCinemaCitySelected: number = 0;

    public cinemas: Cinema[];
    public pendingCinemaSelected: number = 0;
    public validatedCinemaSelected: number = 0;
    //public filteredCity: City[];

    public filter: {cinema_id?: number[], city_id?: number[], start_date?: Date, end_date?: Date} = {};

    constructor(
        private router: Router,
        private _eventsService: EventsService,
        private _messagesService: MessagesService,
        private _citiesService: CitiesService,
        private _cinemasService: CinemasService
    ) {

    }

    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getPendingList(null);
            this.getValidatedEventsList(null);
            this.getCityList(null);
            this.getCinemaList(null);
        }
    }

    ngAfterViewInit() {
        TableJS($, window);
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }
    }
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

    filterPending(){
        let filter = {"city_id":undefined, "cinema_id":undefined};
        if(this.pendingCinemaCitySelected != 0 && this.pendingCinemaCitySelected != undefined){
            filter.city_id = this.pendingCinemaCitySelected;
        }
        if(this.pendingCinemaSelected != 0 && this.pendingCinemaSelected != undefined){
            filter.cinema_id = this.pendingCinemaSelected;
        }

        this.getPendingList(filter);
    }

    getPendingList(filter) : void{
        this._eventsService.getPendingList(filter).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.pendingEvents = json.data;
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

    filterValidated(){
        let filter = {"city_id":undefined, "cinema_id":undefined};
        if(this.validatedCinemaCitySelected != 0 && this.validatedCinemaCitySelected != undefined){
            filter.city_id = this.validatedCinemaCitySelected;
        }
        if(this.validatedCinemaSelected != 0 && this.validatedCinemaSelected != undefined){
            filter.cinema_id = this.validatedCinemaSelected;
        }
        this.getValidatedEventsList(filter);
    }

    getValidatedEventsList(filter) : void{
        this._eventsService.getValidatedList(filter).subscribe(
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

    validateEvent(event: Event){
        this._eventsService.validateEvent(event).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    event.status = EventsService.VALIDATED_ID;
                    let index = null;
                    index = this.pendingEvents.indexOf(event);
                    if (index != -1) {
                        this.pendingEvents.splice(index, 1);
                    }
                    this.validatedEvents.push(event);
                    this._messagesService.showSuccessMessage('El evento ha sido validado correctamente');
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

    setCampaignEvent(event: Event){
        this._eventsService.setInCampaignEvent(event).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    event.status = EventsService.CAMPAIGN_ID;
                    let index = null;
                    index = this.validatedEvents.indexOf(event);
                    if (index != -1) {
                        this.validatedEvents.splice(index, 1);
                    }
                    this._messagesService.showSuccessMessage('Es estado del evento ha cambiado a En Campa�a correctamente');
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

    rejectEvent(event: Event){
        this._eventsService.rejectEvent(event).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    let index = null;
                    if(event.status == EventsService.PENDING_ID){
                        index = this.pendingEvents.indexOf(event);
                        if (index != -1) {
                            this.pendingEvents.splice(index, 1);
                        }
                    }else if (event.status == EventsService.VALIDATED_ID){
                        index = this.validatedEvents.indexOf(event);
                        if (index != -1) {
                            this.validatedEvents.splice(index, 1);
                        }
                    }
                    event.status = EventsService.REJECTED_ID;
                    this._messagesService.showSuccessMessage('El evento ha sido rechazado correctamente');
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

    changePending(){
        this.activeTab = "pending";
    }

    changeValidated(){
        this.activeTab = "validated";
    }

    getCinemaList(filter) : void{
        this._cinemasService.getList(filter).subscribe(
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

    getCityList(filter) : void{
        this._citiesService.getList(filter, "events").subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cities = this.transformForSelect2(json.data);
                    //this.filteredCity = this.cities;
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
