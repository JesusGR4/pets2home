import {Component, OnInit, Output, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Movie} from "../../models/movie";
import {Shelter} from "../../models/shelter.js";
import {ApiConfigService} from "../../services/apiConfig.service";


@Component({
    selector: "shelterCard",
    templateUrl: "./shelterCard.component.html"
})

export class ShelterCardComponent{

    @Input() shelter: Shelter;
    constructor() {

    }
  completeUrl(url: string) {
    return ApiConfigService.PROFILE_IMAGE_FOLDER + url;
  }
}
