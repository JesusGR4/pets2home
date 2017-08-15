import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Animal} from "../../models/animal";
import {MessagesService} from "../../services/messages.service";
import {AnimalService} from "../../services/animal.service";

declare var $: any;
declare var window: any;

@Component({
  selector: "myAnimals",
  templateUrl: "./myAnimals.component.html",
  providers: [AnimalService]
})

export class MyAnimalsComponent{

  private sub: any;
  public animals: Animal[] = [];
  public currentPage = 1;
  public totalItems : number = 0;
  public shelter : number;
  public shelter_name: string;
  constructor(private router: Router, private route: ActivatedRoute, private _messagesService: MessagesService, private _animalService: AnimalService){
  }

  ngOnInit(){
    this.animalsToCards();
    $('html,body').animate({
        scrollTop: $("#myAnimals").offset().top},
      'slow');
  }

  animalsToCards(){
    this._animalService.getMyAnimals(this.currentPage).subscribe(
      res => {
        let json = res.json();
        var animals = json.animals;
        var images = json.images;
        this.totalItems = animals.length;
        for(var i = 0; i<this.totalItems; i++){
          var animal = new Animal();
          animal.id = animals[i].id;
          animal.name = animals[i].name;
          animal.age = animals[i].age;
          animal.gender = animals[i].gender;
          if(json.images.length != 0 || json.images.length != null){
            if(json.images[0] != null) animal.mainPicture = json.images[0].name;
          }
          this.animals.push(animal);
        }
      }
    )
  }
  more(){
    this.currentPage = this.currentPage + 1;
    this.animalsToCards();
  }
}
