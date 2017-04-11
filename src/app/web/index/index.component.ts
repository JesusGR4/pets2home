import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../../models/session";
import {Movie} from "../../models/movie";
import {ApiConfigService} from "../../services/apiConfig.service";
import {MessagesService} from "../../services/messages.service";
import {MoviesService} from "../../services/movies.service";
import {CodesService} from "../../services/codes.service";
import {EventsService} from "../../services/events.service";
declare var Main_carousel: any;
declare var Slider_index: any;
declare var $: any;
declare var window: any;


@Component({
    selector: "index",
    templateUrl: "./index.component.html"
})
export class IndexComponent{
    @Output()
    public session: Session;

    public movies : Movie[] = [];
    public events : Event[] = [];

    constructor(private _messagesService: MessagesService,
                private _moviesService: MoviesService,
                private _eventsService: EventsService) {

    }

    getMovieList(){
        this._moviesService.getCatalog(1, null).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movies = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            });
    }
    getEventList(){
        this._eventsService.getCatalog(1, {geo: 1}).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.events = json.data;
                    let interval = setTimeout(function(interval){
                        Main_carousel($);
                    }, 1000);
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            });
    }

    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

    ngAfterViewInit() {
        Slider_index($);
        this.session = ApiConfigService.getSessionByLocalStorage();
        this.getMovieList();
        this.getEventList();
    }

}
