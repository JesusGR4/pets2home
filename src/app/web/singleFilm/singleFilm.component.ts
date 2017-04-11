import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MoviesService} from "../../services/movies.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {Movie} from "../../models/movie";

declare var FooterReveal2: any;
declare var $: any;
declare var window: any;


@Component({
    selector: "index",
    templateUrl: "./singleFilm.component.html"
})

export class SingleFilmComponent{

    id: number;
    private sub: any;

    public movie: Movie = new Movie();

    constructor(private route: ActivatedRoute,
                private _moviesService: MoviesService,
                private _messagesService: MessagesService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['movie_id'];
        });
        this.getMovieDetails(this.id)
    }

    ngAfterViewInit() {
        FooterReveal2($,window);
    }

    getMovieDetails(movie_id){
        this._moviesService.getDetails(movie_id, 0).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movie = json.data;
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
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

}