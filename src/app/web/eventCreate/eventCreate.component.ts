import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Movie} from "../../models/movie";
import {Cinema} from "../../models/cinema";
import {CinemasService} from "../../services/cinemas.service";
import {MoviesService} from "../../services/movies.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {EventsService} from "../../services/events.service";
import {Event} from "../../models/event";
import {IMyOptions, IMyDateModel} from "mydatepicker";
import {ApiConfigService} from "../../services/apiConfig.service";
import {Session} from "../../models/session";
import {User} from "../../models/user";

// declare var FooterReveal2: any;
declare var $: any;
declare var window: any;


@Component({
    selector: "eventCreate",
    templateUrl: "./eventCreate.component.html"
})

export class EventCreateComponent{
    public session: Session;

    public movie : Movie;
    public movies : any[];

    public cinema : Cinema;
    public cinemas : Cinema[];

    public cinema_select_id : number;

    public checkFormats : boolean;

    public event : Event;

    public suggestions : any[];

    public step : number;
    public movieNotfound : boolean;

    private DATE : Date = new Date();
    private DAYS_MIN : number = 3;
    private DAYS_MAX : number = 28;
    private DATE_MIN : Date = new Date(this.DATE.getTime() + ( this.DAYS_MIN * 24 * 3600 * 1000));
    private DATE_MAX : Date = new Date(this.DATE_MIN.getTime() + ( this.DAYS_MAX * 24 * 3600 * 1000));

    private invalidDate : boolean;

    private invalidTab1 : boolean;
    private invalidTab2 : boolean;
    private invalidTab3 : boolean;
    private invalidTab4 : boolean;

    private accept : boolean;

    private dayBefore : Date ;
    private eventDate : Date;


    private myDatePickerOptions: IMyOptions = {
        todayBtnTxt: 'Hoy',
        showTodayBtn: false,
        showClearDateBtn: false,
        showSelectorArrow: false,
        inputAutoFill: true,
        dateFormat: 'dd-mm-yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: false,
        height: '34px',
        width: '260px',
        inline: false,
        disableSince: {year: this.DATE_MAX.getFullYear(), month: (this.DATE_MAX.getMonth()+1)%12, day: this.DATE_MAX.getDate()},
        disableUntil: {year: this.DATE_MIN.getFullYear(), month: (this.DATE_MIN.getMonth()+1)%12, day: this.DATE_MIN.getDate()},
        selectionTxtFontSize: '16px'
    };

    constructor(
        private router: Router,
        private _moviesService: MoviesService,
        private _eventsService: EventsService,
        private _cinemasService: CinemasService,
        private _messagesService: MessagesService
    ) {
        this.movie = new Movie();
        this.cinema = new Cinema();
        this.event = new Event();
        this.event.user = new User();
        this.checkFormats = false;
        this.step = 1;
        this.movieNotfound = false;
        this.suggestions = [];
        this.accept = false;

        this.invalidTab1 = false;
        this.invalidTab2 = false;
        this.invalidTab3 = false;
        this.invalidTab4 = false;
    }

    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        this.getMovies();
        this.getCinemas();
    }

    ngAfterViewInit() {
        //FooterReveal2($,window);
    }
    getMovies(){
        this._moviesService.getList(0).subscribe(
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
            });
    }
    getMovie(){
        this._moviesService.getDetails(this.movie.id, 0).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movie = json.data;
                    this.event.movie_id = this.movie.id;
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
    getCinemas(){
        this._cinemasService.getPublicList().subscribe(
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
            });
    }
    getCinema(type){
        let id = null;
        if(type === "select"){
            id = this.cinema_select_id;
        }else{
            id = this.cinema.id;
        }
        this._cinemasService.getDetails(id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cinema = json.data;
                    this.event.cinema_id = this.cinema.id;
                    this.calculate();
                    this.goStep(3);
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
    checkFormat(){
        this._moviesService.checkFormats(this.movie.id, this.cinema_select_id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.checkFormats = json.data['checkFormats'];
                    if(!this.checkFormats){
                        this.suggestions = json.data['suggestions'];
                    }else{
                        this.getCinema('select');
                    }
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
    saveEvent(){
        if(!this.accept){
            this.invalidTab4 = true;
            return false;
        }
        this._eventsService.createEvent(this.event, this.session.id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this._messagesService.showSuccessMessage('El evento se ha creado correctamente');
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
    calculate(){
        this._eventsService.calculate(this.movie.id, this.cinema.id).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.event.vat_price = json.data['vat_price'];
                    this.event.crowdfunding_target = json.data['crowdfunding_target'];
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

    private selectMovie(){
        this.getMovie();
    }
    private deselectMovie(){
        this.movie = new Movie();
    }
    private selectCinema(){
        this.checkFormat();
    }
    private deselectCinema(){
        this.cinema = new Cinema();
        this.suggestions = [];
    }
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

    private goStep(step : number){
        if(step > 1){
            if(this.movie == null || this.event.language_id == null){
                this.invalidTab1 = true;
                return false;
            }
        }
        if(step > 2){
            if(this.cinema == null || this.cinema.name == null){
                this.invalidTab2 = true;
                return false;
            }
        }
        if(step > 3){
            if(this.invalidDate || this.event.hour == null || this.event.description == null || (this.session.name == null &&
                (this.event.user.name == null || this.event.user.surnames == null || this.event.user.phone == null ||
                this.event.user.email == null))){
                this.invalidTab3 = true;
                return false;
            }
        }
        this.step = step;
    }

    private transformForSelect2(datas: Array<any>){
        let result = [];
        for(let i=0;i<datas.length; i++){
            let value = datas[i].id;
            let label = null;
            if(datas[i].title != null){
                label = datas[i].title;
            }else{
                label = datas[i].name;
            }
            result.push({value : value.toString(), label : label});
        }
        return result;
    }

    onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        var date = new Date();
        date.setFullYear(event.date.year);
        date.setMonth((event.date.month - 1)%12);
        date.setDate(event.date.day);
        if(date.getUTCDay() != 1 && date.getUTCDay() != 2 && date.getUTCDay() != 4){
            window.alert('El día seleccionado no está disponible. Solo se pueden seleccionar lunes, martes y jueves')
            this.invalidDate = true;
            this.event.date = null;
        }else{
            this.invalidDate = false;
            this.dayBefore = new Date(date.getTime() - 1000 * 3600 * 24);
            this.eventDate = new Date(date.getTime());
        }

    }
    // private calculateDisabledDays(){
    //     let disabled_days = [];
    //     for(let i = 1; i<=(this.DAYS_MAX+this.DAYS_MIN); i++){
    //         let new_date = new Date(this.DATE_MIN.getTime() + ( i * 24 * 3600 * 1000));
    //         console.log(new_date);
    //         console.log(new_date.getUTCDay());
    //         if(new_date.getUTCDay() != 2 && new_date.getUTCDay() != 4 && new_date.getUTCDay() != 0){
    //             console.log('NO ENTRA');
    //             disabled_days.push({year: new_date.getFullYear(), month: new_date.getMonth(), day: new_date.getDate()})
    //         }else{
    //             console.log('ENTRA')
    //         }
    //
    //     }
    //     return disabled_days;
    // }
}