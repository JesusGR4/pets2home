import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var TableJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "surveys",
    templateUrl: "./surveys.component.html",

})
export class Surveys {

    constructor() {

    }

    ngAfterViewInit() {
        TableJS($, window);
    }

}