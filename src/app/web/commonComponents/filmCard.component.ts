import {Component, OnInit, Output, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Movie} from "../../models/movie";


@Component({
    selector: "filmCard",
    templateUrl: "./filmCard.component.html"
})

export class FilmCardComponent{

    @Input() movie: Movie;
    constructor() {

    }

}