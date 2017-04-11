import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";
import {ProfilesService} from "../../../services/profiles.service";
import {MoviesService} from "../../../services/movies.service";
import {Movie} from "../../../models/movie";
import {EventsService} from "../../../services/events.service";
import {Event} from "../../../models/event";
import {Session} from "../../../models/session";

declare var TableJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "providerEventsManagement",
    templateUrl: "./providerEventsManagement.component.html",

})
export class ProviderEventsManagement {

    public session: Session;

    public activeEvents: Event[];
    public completedEvents: Event[];
    public canceledEvents: Event[];

    public activeTab = "active";

    public events: Event[];
    public event: Event = new Event;

    public movies: Movie[];
    public activeMovieSelected: number = 0;
    public completedMovieSelected: number = 0;
    public canceledMovieSelected: number = 0;
    //public filteredCity: City[];

    public filter: {movie_id?: number[]} = {};

    constructor(
        private router: Router,
        private _eventsService: EventsService,
        private _messagesService: MessagesService,
        private _moviesService: MoviesService
    ) {

    }

    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.PROVIDER_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getActiveEventsList(null);
            this.getCompletedEventsList(null);
            this.getCanceledEventsList(null);
            this.getMoviesList();
        }
    }

    ngAfterViewInit() {
        TableJS($, window);
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.PROVIDER_PROFILE_ID){
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
        let filter = {"movie_id":undefined};
        if(this.activeMovieSelected != 0 && this.activeMovieSelected != undefined){
            filter.movie_id = this.activeMovieSelected;
        }

        this.getActiveEventsList(filter);
    }

    getActiveEventsList(filter) : void{
        this._eventsService.getActiveList(filter, ProfilesService.PROVIDER_PROFILE_ID).subscribe(
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
        let filter = {"movie_id":undefined};
        if(this.completedMovieSelected != 0 && this.completedMovieSelected != undefined){
            filter.movie_id = this.completedMovieSelected;
        }
        this.getCompletedEventsList(filter);
    }

    getCompletedEventsList(filter) : void{
        this._eventsService.getCompletedList(filter, ProfilesService.PROVIDER_PROFILE_ID).subscribe(
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
        let filter = {"movie_id":undefined};
        if(this.canceledMovieSelected != 0 && this.canceledMovieSelected != undefined){
            filter.movie_id = this.canceledMovieSelected;
        }
        this.getCanceledEventsList(filter);
    }

    getCanceledEventsList(filter) : void{
        this._eventsService.getCanceledList(filter, ProfilesService.PROVIDER_PROFILE_ID).subscribe(
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

    getMoviesList() : void{
        this._moviesService.getMoviesByProvider().subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movies = this.transformForSelect2(json.data);
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
            let label = datas[i].title;
            if(datas[i].surnames != null){
                label = label + " " + datas[i].surnames;
            }
            result.push({value : value.toString(), label : label});
        }
        return result;
    }


}