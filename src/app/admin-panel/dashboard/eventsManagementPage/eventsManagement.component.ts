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
    selector: "eventsManagement",
    templateUrl: "./eventsManagement.component.html",

})
export class EventsManagement {

    public session: Session;

    public activeEvents: Event[];
    public completedEvents: Event[];
    public canceledEvents: Event[];

    public activeTab = "active";

    public events: Event[];
    public event: Event = new Event;

    public cities: City[];
    public activeCinemaCitySelected: number = 0;
    public completedCinemaCitySelected: number = 0;
    public canceledCinemaCitySelected: number = 0;

    public cinemas: Cinema[];
    public cinemasCompleted: Cinema[];
    public activeCinemaSelected: number = 0;
    public completedCinemaSelected: number = 0;
    public canceledCinemaSelected: number = 0;
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
            this.getActiveEventsList(null);
            this.getCompletedEventsList(null);
            this.getCanceledEventsList(null);
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

    filterActives(){
        let filter = {"city_id":undefined, "cinema_id":undefined};
        if(this.activeCinemaCitySelected != 0 && this.activeCinemaCitySelected != undefined){
            filter.city_id = this.activeCinemaCitySelected;
        }
        if(this.activeCinemaSelected != 0 && this.activeCinemaSelected != undefined){
            filter.cinema_id = this.activeCinemaSelected;
        }

        this.getActiveEventsList(filter);
    }

    getActiveEventsList(filter) : void{
        this._eventsService.getActiveList(filter).subscribe(
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
        let filter = {"city_id":undefined, "cinema_id":undefined};
        if(this.completedCinemaCitySelected != 0 && this.completedCinemaCitySelected != undefined){
            filter.city_id = this.completedCinemaCitySelected;
        }
        if(this.completedCinemaSelected != 0 && this.completedCinemaSelected != undefined){
            filter.cinema_id = this.completedCinemaSelected;
        }
        this.getCompletedEventsList(filter);
    }

    getCompletedEventsList(filter) : void{
        this._eventsService.getCompletedList(filter).subscribe(
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
        let filter = {"city_id":undefined, "cinema_id":undefined};
        if(this.canceledCinemaCitySelected != 0 && this.canceledCinemaCitySelected != undefined){
            filter.city_id = this.canceledCinemaCitySelected;
        }
        if(this.canceledCinemaSelected != 0 && this.canceledCinemaSelected != undefined){
            filter.cinema_id = this.canceledCinemaSelected;
        }
        this.getCanceledEventsList(filter);
    }

    getCanceledEventsList(filter) : void{
        this._eventsService.getCanceledList(filter).subscribe(
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

    publishEvent(event: Event){
        this._eventsService.publishEvent(event).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    event.published = 1;
                    this._messagesService.showSuccessMessage('El evento ha sido publicado correctamente');
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

    unpublishEvent(event: Event){
        this._eventsService.unpublishEvent(event).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    event.published = 0;
                    this._messagesService.showSuccessMessage('El evento ha sido despublicado correctamente');
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

    deleteEventModal(event: Event){
        this.event = event;
        $('#deleteEvent').modal('toggle');
    }

    deleteEvent(event: Event){
        this._eventsService.deleteEvent(this.event).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = null;
                    if(event.status == 3 || event.status == 4 || event.status == 5){
                        index = this.activeEvents.indexOf(event);
                        if (index != -1) {
                            this.activeEvents.splice(index, 1);
                        }
                    }else if(event.status == 5){
                        index = this.completedEvents.indexOf(event);
                        if (index != -1) {
                            this.completedEvents.splice(index, 1);
                        }
                    }else if(event.status == 7){
                        index = this.canceledEvents.indexOf(event);
                        if (index != -1) {
                            this.canceledEvents.splice(index, 1);
                        }
                    }

                    this._messagesService.showSuccessMessage('El evento se ha eliminado correctamente');
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
