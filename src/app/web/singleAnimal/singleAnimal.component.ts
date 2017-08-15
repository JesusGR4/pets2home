import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {AnimalService} from "../../services/animal.service";
import {Animal} from "../../models/animal";

declare var $: any;
declare var window: any;
declare var PopUp: any;

@Component({
  selector: "singleAnimal",
  templateUrl: "./singleAnimal.component.html",
  providers:[AnimalService]
})

export class SingleAnimalComponent{
  id: number;
  private sub:any;
  public animal: Animal = new Animal();
  public images: string[]=[];
  public mainPicture:any;
  constructor(private route: ActivatedRoute,private _messagesService: MessagesService, private _animalService:AnimalService){

  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['animal_id'];
    });
    this.getAnimalDetails();
    PopUp($, window);
    $('html,body').animate({
        scrollTop: $("#singleAnimal").offset().top},
      'slow');
  }

  getAnimalDetails(){
    this._animalService.getAnimalById(this.id).subscribe(
      res => {
        let json = res.json();
        let code = json.code;
        let message = json.message;
        let animal = json.animal;
        let images = json.images;
        if(code == CodesService.OK_CODE){
          this.animal.id = animal.id;
          this.animal.name = animal.name;
          this.animal.gender = animal.gender;
          this.animal.breed = animal.breed;
          this.animal.age = animal.age;
          this.animal.medicalHistory = animal.medicalHistory;
          //this.mainPicture = images[0].name;
          images.shift();
          if(animal.type==1) this.animal.size = animal.size;
          var totalImages = images.length;
          for(var i=0;  i< totalImages; i++){
            this.images.push(images[i].name);
          }
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
  private handlerError(code, message){
    if(code == CodesService.INVALID_TOKEN){
      message = MessagesService.INVALID_TOKEN_MESSAGE;
    }
    this._messagesService.showErrorMessage(message);
  }
  completeUrl(url: string) {
    return ApiConfigService.PROFILE_IMAGE_FOLDER + url;
  }
}
