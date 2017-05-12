import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MoviesService} from "../../services/movies.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {Movie} from "../../models/movie";
import {ShelterService} from "../../services/shelter.service";
import {Shelter} from "../../models/shelter.js";

declare var FooterReveal2: any;
declare var $: any;
declare var window: any;


@Component({
    selector: "index",
    templateUrl: "./singleShelter.component.html"
})

export class SingleShelterComponent{

    id: number;
    private sub: any;

    public shelter: Shelter = new Shelter();
    constructor(private route: ActivatedRoute,
                private _shelterService: ShelterService,
                private _messagesService: MessagesService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['shelter_id'];
        });

    }

    ngAfterViewInit() {
        FooterReveal2($,window);
    }

    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

}
