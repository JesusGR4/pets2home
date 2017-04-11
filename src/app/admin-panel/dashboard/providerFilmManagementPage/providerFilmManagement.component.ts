import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MessagesService} from "../../../services/messages.service";
import {FormatsService} from "../../../services/formats.service";
import {CodesService} from "../../../services/codes.service";
import {MoviesService} from "../../../services/movies.service";
import {ActorsService} from "../../../services/actors.service";
import {CountriesService} from "../../../services/countries.service";
import {GenresService} from "../../../services/genres.service";
import {DirectorsService} from "../../../services/directors.service";
import {QualificationsService} from "../../../services/qualifications.service";
import {LanguagesService} from "../../../services/languages.service";
import {TagsService} from "../../../services/tags.service";
import {Session} from "../../../models/session";
import {ApiConfigService} from "../../../services/apiConfig.service";
import {ProfilesService} from "../../../services/profiles.service";
import {Movie} from "../../../models/movie";
import {Country} from "../../../models/country";
import {Director} from "../../../models/director";
import {Actor} from "../../../models/actor";
import {Genre} from "../../../models/genre";
import {Tag} from "../../../models/tag";
import {Qualification} from "../../../models/qualification";
import {Language} from "../../../models/language";
import {Format} from "../../../models/format";

declare var TableJS:any;
declare var multiSelectJS:any;
declare var $:any;
declare var window:any;
declare var Dropzone: any;

@Component({
    selector: "providerFilmManagement",
    templateUrl: "./providerFilmManagement.component.html",

})
export class ProviderFilmManagement {
    public session: Session;

    public movies : Movie[] = [];
    public movie : Movie = new Movie();
    public auxMovie : Movie = new Movie();

    public genres : Genre[] = [];
    public countries : Country[] = [];
    public directors : Director[] = [];
    public actors : Actor[] = [];
    public tags : Tag[] = [];
    public languages : Language[] = [];
    public qualifications : Qualification[] = [];
    public formats : Format[] = [];

    public filter : string = "";

    public currentPage = 1;
    public totalItems : number = 0;

    public movieMode : string = 'new';

    constructor(private router: Router,
                private _moviesService: MoviesService,
                private _actorsService: ActorsService,
                private _countriesService: CountriesService,
                private _directorsService: DirectorsService,
                private _genresService: GenresService,
                private _formatsService: FormatsService,
                private _languagesService: LanguagesService,
                private _qualificationsService: QualificationsService,
                private _tagsService: TagsService,
                private _messagesService: MessagesService) {
    }


    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != ProfilesService.PROVIDER_PROFILE_ID){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getMovieList();
            this.getGenreList();
            this.getTagList();
            this.getActorList();
            this.getQualificationList();
            this.getFormatList();
            this.getCountryList();
            this.getActorList();
            this.getLanguageList();
            this.getTagList();
            this.getDirectorList();
        }
    }
    applyFilter(){
        this.currentPage = 1;
        this.getMovieList();
    }
    getMovieList(){
        this._moviesService.getList(this.currentPage, this.filter, ProfilesService.PROVIDER_PROFILE_ID).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movies = json.data;
                    this.totalItems = json.totalItems;
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
    listPaginate($event){
        this.currentPage = $event;
        this.getMovieList();
    }

    createMovie(){
        this.movieMode = 'new';
        this.auxMovie = new Movie();
    }

    seeDetails(movie){
        this.movieMode = 'see';
        $(document).scrollTop( $("#addNewFilm").offset().top );
        this.movie = movie;
        this.getMovieDetails(movie.id);
    }

    saveMovie(){
        this._moviesService.createMovie(this.auxMovie, this.session.id, ProfilesService.PROVIDER_PROFILE_ID).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movies.push(json.data);
                    this.auxMovie = new Movie();
                    this._messagesService.showSuccessMessage('La película se ha creado correctamente');
                    //Dropzone.forElement(".dropzone").removeAllFiles(true);
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

    getMovieDetails(movie_id){
        this._moviesService.getDetails(movie_id, 1).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.auxMovie = this._moviesService.copyMovie(json.data);
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

    getActorList(){
        this._actorsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.actors = this.transformForSelect2(json.data);
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
    getDirectorList(){
        this._directorsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.directors = this.transformForSelect2(json.data);
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
    getCountryList(){
        this._countriesService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.countries = this.transformForSelect2(json.data);
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
    getGenreList(){
        this._genresService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.genres = this.transformForSelect2(json.data);
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
    getFormatList(){
        this._formatsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.formats = this.transformForSelect2(json.data);
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
    getLanguageList(){
        this._languagesService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.languages = this.transformForSelect2(json.data);
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
    getQualificationList(){
        this._qualificationsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.qualifications = this.transformForSelect2(json.data);
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
    getTagList(){
        this._tagsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.tags = this.transformForSelect2(json.data);
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