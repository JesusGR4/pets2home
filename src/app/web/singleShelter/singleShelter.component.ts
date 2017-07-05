import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MoviesService} from "../../services/movies.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {Movie} from "../../models/movie";
import {ShelterService} from "../../services/shelter.service";
import {Shelter} from "../../models/shelter.js";
import {ApiConfigService} from "../../services/apiConfig.service";


declare var $: any;
declare var window: any;
declare var PopUp: any;

@Component({
    selector: "singleShelter",
    templateUrl: "./singleShelter.component.html",
    providers:[ShelterService]
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
      this.getShelterDetails();
      PopUp($, window);

    }

    ngAfterViewInit(){
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['shelter_id'];
      });
      $('html,body').animate({
          scrollTop: $("#singleShelter").offset().top},
        'slow');
    }

    getShelterDetails(){
      this._shelterService.getShelterById(this.id).subscribe(
        res => {
          let json = res.json();
          let code = json.code;
          let message = json.message;
          if(code == CodesService.OK_CODE){
            this.convertToShelter(json);
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
    private convertToShelter(json){
      this.shelter.name = json.shelter.user_name;
      this.shelter.phone = json.shelter.user_phone;
      this.shelter.email = json.shelter.user_email;
      this.shelter.city = json.shelter.user_city;
      this.shelter.latitude = json.shelter.shelter_latitude;
      this.shelter.longitude = json.shelter.shelter_longitude;
      this.shelter.address = json.shelter.shelter_address;
      this.shelter.description = json.shelter.description;
      this.shelter.schedule = json.shelter.shelter_schedule;
    }
    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

}
