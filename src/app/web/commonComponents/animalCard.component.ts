import {Component, OnInit, Output, Input} from '@angular/core';
import {ApiConfigService} from '../../services/apiConfig.service';
import {Animal} from "../../models/animal";
import {AnimalService} from "../../services/animal.service";

@Component({
  selector: 'animalCard',
  templateUrl: './animalCard.component.html',

})

export class AnimalCardComponent {

  @Input() animal: Animal;

  rol: string;

  constructor(){

  }
  completeUrl(url: string) {
    return ApiConfigService.PROFILE_IMAGE_FOLDER + url;
  }



}
