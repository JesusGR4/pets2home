import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../models/movie";
import {MessagesService} from "../../services/messages.service";
import {Session} from "../../models/session";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {CountriesService} from "../../services/countries.service";
import {GenresService} from "../../services/genres.service";
import {LanguagesService} from "../../services/languages.service";
import {QualificationsService} from "../../services/qualifications.service";
import {TagsService} from "../../services/tags.service";
import {Genre} from "../../models/genre";
import {Country} from "../../models/country";
import {Tag} from "../../models/tag";
import {Language} from "../../models/language";
import {Qualification} from "../../models/qualification";

declare var FooterReveal2: any;
declare var $: any;
declare var window: any;


@Component({
    selector: "shelterCatalog",
    templateUrl: "./shelterCatalog.component.html"
})

export class ShelterCatalog{

    public session: Session;
    private sub: any;

    public filter: {genres_id?: number[], countries_id?: number[], year?: number, languages_id?: number[],
        qualifications_id?: number[], tags_id?: number[], director_id?: number[], actor_id?: number[]} = {};

    public movies : Movie[] = [];
    public genres : Genre[] = [];
    public countries : Country[] = [];
    public tags : Tag[] = [];
    public languages : Language[] = [];
    public qualifications : Qualification[] = [];

    public currentPage = 1;
    public totalItems : number = 0;
    public province : string;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private _messagesService: MessagesService,
                private _moviesService: MoviesService,
                private _countriesService: CountriesService,
                private _genresService: GenresService,
                private _languagesService: LanguagesService,
                private _qualificationsService: QualificationsService,
                private _tagsService: TagsService) {

    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.filter.director_id = params['province'];


        });
    }

    /* TODO M�todo para esperar la carga de todos los filtros y completarlos con los par�metros de url.
       TODO de momento se hace en cada petici�n la comprobaci�n.
    loadFilters() {
        Promise.all([
            this.getMovieList(),
            this.getCountryList(),
            this.getGenreList(),
            this.getLanguageList(),
            this.getQualificationList(),
            this.getTagList(),
        ]).then(

        ));
    }*/

    getMovieList(){
        this._moviesService.getCatalog(this.currentPage, this.filter).subscribe(
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
    getMoreMovieList(){
        this._moviesService.getCatalog(this.currentPage, this.filter).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movies = this.movies.concat(json.data);
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
                    this.sub = this.route.queryParams.subscribe(params => {
                        if(params['country_id'] != undefined){
                            this.filter.countries_id = [parseInt(params['country_id'])];
                        }
                    });
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
                    this.sub = this.route.queryParams.subscribe(params => {
                        if(params['genre_id'] != undefined){
                            this.filter.genres_id = [parseInt(params['genre_id'])];
                        }
                    });
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
                    this.sub = this.route.queryParams.subscribe(params => {
                        if(params['language_id'] != undefined){
                            this.filter.languages_id = [parseInt(params['language_id'])];
                        }
                    });
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
                    this.sub = this.route.queryParams.subscribe(params => {
                        if(params['qualification_id'] != undefined){
                            this.filter.qualifications_id = [parseInt(params['qualification_id'])];
                        }
                    });
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
                    this.sub = this.route.queryParams.subscribe(params => {
                        if(params['tag_id'] != undefined){
                            this.filter.tags_id = [parseInt(params['tag_id'])];
                        }
                    });
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

    applyFilter(){
        this.currentPage = 1;
        this.getMovieList();
    }
    mas(){
      //TODO: Si el número de items de esa página es diferente al número máximo de elementos por página, quitar
        this.currentPage = this.currentPage + 1;
        this.getMoreMovieList();
    }

    ngAfterViewInit() {
        FooterReveal2($,window);
        this.session = ApiConfigService.getSessionByLocalStorage();
        this.getMovieList();
        this.getGenreList();
        this.getTagList();
        this.getQualificationList();
        this.getCountryList();
        this.getLanguageList();
        this.getTagList();
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
            result.push({value : value, label : label});
        }

        return result;
    }

}
