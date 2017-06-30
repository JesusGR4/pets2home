import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MessagesService} from "../../../services/messages.service";
import {FormatsService} from "../../../services/formats.service";
import {UsersService} from "../../../services/users.service";
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
import {Movie} from "../../../models/movie";
import {Country} from "../../../models/country";
import {Director} from "../../../models/director";
import {Actor} from "../../../models/actor";
import {Genre} from "../../../models/genre";
import {Tag} from "../../../models/tag";
import {Qualification} from "../../../models/qualification";
import {Language} from "../../../models/language";
import {Format} from "../../../models/format";
import {User} from "../../../models/user";
import {forEach} from "@angular/router/src/utils/collection";

declare var TableJS:any;
declare var multiSelectJS:any;
declare var $:any;
declare var window:any;
declare var Dropzone: any;

@Component({
    selector: "filmManagement",
    templateUrl: "./filmManagement.component.html",

})
export class FilmManagement {
    public session: Session;

    public movies : Movie[] = [];
    public similarMovies : Movie[] = [];
    public selectedMovie: number = 0;
    public movie : Movie = new Movie();
    public auxMovie : Movie = new Movie();
    public movieDB : Movie = new Movie();

    public genres : Genre[] = [];
    private auxGenresIds = [];
    public countries : Country[] = [];
    public directors : Director[] = [];
    private auxDirectorsIds = [];
    public actors : Actor[] = [];
    private auxActorsIds = [];
    public tags : Tag[] = [];
    public languages : Language[] = [];
    public qualifications : Qualification[] = [];
    public formats : Format[] = [];
    public users : User[] = [];

    public profileFilter: {provider?: boolean} = {};

    public filter : string = "";

    public currentPage = 1;
    public totalItems : number = 0;

    public movieMode : string = 'new';

    public token : string;

    constructor(private router: Router,
                private _moviesService: MoviesService,
                private _actorsService: ActorsService,
                private _countriesService: CountriesService,
                private _directorsService: DirectorsService,
                private _genresService: GenresService,
                private _formatsService: FormatsService,
                private _languagesService: LanguagesService,
                private _qualificationsService: QualificationsService,
                private _usersService: UsersService,
                private _tagsService: TagsService,
                private _messagesService: MessagesService) {
    }


    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.token = localStorage.getItem(ApiConfigService.TOKEN_FIELD);
            this.auxMovie.frames = [];
            this.auxMovie.frames_url = [];
            this.profileFilter.provider = true;
            this.getMovieList();
            this.getGenreList();
            this.getTagList();
            this.getQualificationList();
            this.getFormatList();
            this.getCountryList();
            this.getActorList();
            this.getLanguageList();
            this.getDirectorList();
            this.getProviderList();
        }
    }
    applyFilter(){
        this.currentPage = 1;
        this.getMovieList();
    }
    getMovieList(){
        this._moviesService.getList(this.currentPage, this.filter).subscribe(
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

    searchMovies(){
        if(this.auxMovie.title != undefined) {
          this._moviesService.getMoviesFromTheMovieDB(this.auxMovie.title).subscribe(
            res => {
              let json = res.json();
              let code = json.code;
              let message = json.message;
              if (code == CodesService.OK_CODE) {
                this.similarMovies = json.data;
                $('#TheMovieDbModal').modal('toggle');
              } else {
                this.handlerError(code, message);
              }
            },
            error => {
              let errorMessage = <any>error;

              if (errorMessage !== null) {
                this._messagesService.showServerErrorMessage(errorMessage);
              }
            });
        }
    }

    getMovie(){
        this._moviesService.getMovieFromTheMovieDB(this.selectedMovie).subscribe(
                res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    let allDirectors = true;
                    for (let directorMovie of json.data.directors) {
                        let index = this.auxDirectorsIds.indexOf(directorMovie);
                        if (index == -1) {
                            allDirectors = false;
                            break;
                        }
                    }
                    if(!allDirectors){
                        this.getDirectorList();
                    }

                    let allActors = true;
                    for (let actorMovie of json.data.actors) {
                        let index = this.auxActorsIds.indexOf(actorMovie);
                        if (index == -1) {
                            allActors = false;
                            break;
                        }
                    }
                    if(!allActors){
                        this.getActorList();
                    }

                    let allGenres = true;
                    for (let genreMovie of json.data.genres) {
                        let index = this.auxGenresIds.indexOf(genreMovie);
                        if (index == -1) {
                            allGenres = false;
                            break;
                        }
                    }
                    if(!allGenres){
                        this.getGenreList();
                    }
                    this.movieDB = json.data;
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
            });
    }

    listPaginate($event){
        this.currentPage = $event;
        this.getMovieList();
    }
    createMovie(){
        this.movieMode = 'new';
        this.closeUploadImage();
        this.auxMovie = new Movie();
    }
    editMovie(movie){
        this.movieMode = 'edit';
        this.closeUploadImage();
        $(document).scrollTop( $("#addNewFilm").offset().top );
        this.movie = movie;
        this.getMovieDetails(movie.id);
    }
    deleteMovieModal(movie: Movie){
        this.movieMode = 'delete';
        this.movie = movie;
        $('#deleteMovie').modal('toggle');
    }

    deleteMovie(movie: Movie){
        this._moviesService.deleteMovie(this.movie).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    var index = this.movies.indexOf(movie);
                    if (index != -1) {
                        this.movies.splice(index, 1);
                    }
                    this._messagesService.showSuccessMessage('La película se ha eliminado correctamente');
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

    publishMovie(movie: Movie){
        this._moviesService.publishMovie(movie).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    movie.published = 1;
                    this._messagesService.showSuccessMessage('La película ha sido publicada correctamente');
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

    featureMovie(movie: Movie){
        this._moviesService.featureMovie(movie).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    movie.featured = json.data.featured;
                    let responseMessage = "";
                    if(movie.featured == 1){
                        responseMessage = "La película ha sido marcado como destacada";
                    }else{
                        responseMessage = "La película ha sido desmarcado como destacada";
                    }
                    this._messagesService.showSuccessMessage(responseMessage);
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

    unpublishMovie(movie: Movie){
        this._moviesService.unpublishMovie(movie).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    movie.published = 0;
                    this._messagesService.showSuccessMessage('La película ha sido despublicada correctamente');
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

    saveMovie(){
        this._moviesService.createMovie(this.auxMovie).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movies.push(json.data);
                    this._messagesService.showSuccessMessage('La película se ha creado correctamente');
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
    updateMovie(){
        this._moviesService.updateMovie(this.auxMovie).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movie = this._moviesService.setMovie(this.movie, json.data);
                    this._messagesService.showSuccessMessage('La película se ha actualizado correctamente');
                    // Dropzone.forElement(".dropzone").removeAllFiles(true);
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
    getProviderList(){
        this._usersService.getList(this.profileFilter).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.users = this.transformForSelect2(json.data);
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
    getActorList(){
        this._actorsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.actors = this.transformForSelect2(json.data);
                    for (let act of json.data) {
                        let index = this.auxActorsIds.indexOf(act.id);
                        if (index == -1) {
                            this.auxActorsIds.push(act.id);
                        }
                    }
                    if(this.movieDB.actors){
                        setTimeout(()=>{
                            this.auxMovie.actors = this.movieDB.actors.map(String);
                        },1000);
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
    getDirectorList(){
        this._directorsService.getList().subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.directors = this.transformForSelect2(json.data);
                    for (let dir of json.data) {
                        let index = this.auxDirectorsIds.indexOf(dir.id);
                        if (index == -1) {
                            this.auxDirectorsIds.push(dir.id);
                        }
                    }
                    if(this.movieDB.directors){
                        setTimeout(()=>{
                            this.auxMovie.directors = this.movieDB.directors.map(String);
                        },1000);
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
                    for (let gen of json.data) {
                        let index = this.auxGenresIds.indexOf(gen.id);
                        if (index == -1) {
                            this.auxGenresIds.push(gen.id);
                        }
                    }
                    if(this.movieDB.genres){
                        setTimeout(()=>{
                            this.auxMovie.genres = this.movieDB.genres.map(String);
                        },1000);
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

    updateMovieImage($event){
        this.auxMovie.img_url = JSON.parse($event.serverResponse)['data'];
    }
    removeMovieImage($event){
        this.auxMovie.img_url = null;
    }
    removeFrame(id){
        let index = this.auxMovie.frames.indexOf(id);
        if (index > -1) {
            this.auxMovie.frames.splice(index, 1);
            if(this.auxMovie.frames_url[index] != null){
                this.auxMovie.frames_url.splice(index, 1);
            }
        }
    }
    removeFrame2($event){
        let id = JSON.parse($event.serverResponse)['data'];
        this.removeFrame(id);
    }
    addFrame($event){
        this.auxMovie.frames.push(JSON.parse($event.serverResponse)['data']);
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

    private closeUploadImage(){
        $('span.close').click();
    }


}
