import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {Session} from "../../../models/session";
import {CinemaCompany} from "../../../models/cinemaCompany";
import {CinemaCompaniesService} from "../../../services/cinemaCompanies.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";
import {CinemasService} from "../../../services/cinemas.service";
import {Cinema} from "../../../models/cinema";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CitiesService} from "../../../services/cities.service";
import {ProvincesService} from "../../../services/provinces.service";
import {FormatsService} from "../../../services/formats.service";
import {City} from "../../../models/city";
import {Province} from "../../../models/province";
import {Format} from "../../../models/format";
import {Room} from "../../../models/room";
import {User} from "../../../models/user";
import {RoomsService} from "../../../services/rooms.service";
import {UsersService} from "../../../services/users.service";
import {ShelterService} from "../../../services/shelter.service";

declare var TableJS:any;
declare var $:any;
declare var window:any;
declare var Dropzone: any;


@Component({
    selector: "pendingShelters",
    templateUrl: "./pendingShelters.component.html",
    providers:[ShelterService]

})
export class PendingSheltersManagement{



    constructor(private _shelterService: ShelterService

    ){

    }


    ngOnInit() {

      this.getPendingShelters();

    }

    getPendingShelters(){
      this._shelterService.getPendingShelters().subscribe(
        res =>{

        }
      );
    }

}
