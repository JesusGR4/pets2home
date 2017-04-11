import {Component, OnInit, Output, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EventsService} from "../../services/events.service";
import {Event} from "../../models/event";


@Component({
    selector: "eventCard",
    templateUrl: "./eventCard.component.html"
})

export class EventCardComponent{

    @Input() event: Event;
    constructor(private _eventServices : EventsService) {

    }

    getStatusById(id){
        return this._eventServices.getStatusById(id);
    }



}