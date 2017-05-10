import {Component, OnInit, Output, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Movie} from "../../models/movie";
import {Shelter} from "../../models/shelter.js";


@Component({
    selector: "shelterCard",
    templateUrl: "./shelterCard.component.html"
})

export class ShelterCardComponent{

    @Input() shelter: Shelter;
    constructor() {

    }

}
