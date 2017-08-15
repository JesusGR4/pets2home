import {Component, OnInit, Output, Input} from '@angular/core';
import {ApiConfigService} from '../../services/apiConfig.service';
import {Animal} from "../../models/animal";

@Component({
  selector: 'animalCard',
  templateUrl: './animalCard.component.html'
})

export class AnimalCardComponent {

  @Input() animal: Animal;

  constructor(){

  }

  completeUrl(url: string) {
    return ApiConfigService.PROFILE_IMAGE_FOLDER + url;
  }

}
