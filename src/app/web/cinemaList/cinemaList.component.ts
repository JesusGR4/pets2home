import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var FooterReveal2: any;
declare var $: any;
declare var window: any;


@Component({
    selector: "cinemaList",
    templateUrl: "./cinemaList.component.html"
})

export class CinemaList{

    lat: number = 51.678418;
    lng: number = 7.809007;
    constructor() {

    }

}