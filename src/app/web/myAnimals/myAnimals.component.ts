import { Component, OnInit, Output, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Animal} from "../../models/animal";
import {MessagesService} from "../../services/messages.service";
import {AnimalService} from "../../services/animal.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from "ng2-translate";
import {CodesService} from "../../services/codes.service";
declare var $: any;
declare var window: any;

@Component({
  selector: "myAnimals",
  templateUrl: "./myAnimals.component.html",
  providers: [AnimalService]
})
export class MyAnimalsComponent{
  rol: string;
  private sub: any;
  public animalList: Animal[] = [];
  public currentPage = 1;
  public totalItems : number = 0;
  public shelter : number;
  public shelter_name: string;
  @ViewChild('modal')
  public modal: ModalComponent;
  public translation : string;
  public errorMessages: any;
  constructor(private router: Router, private route: ActivatedRoute, private _messagesService: MessagesService, private _animalService: AnimalService,  private translateService: TranslateService,private toastyService:ToastyService){
    this.rol = localStorage.getItem(ApiConfigService.ROL_FIELD);
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
            if(json.images[i] != null) animal.mainPicture = json.images[i].name;
          }
          this.animalList.push(animal);
        }
      }
    )
  }

  more(){
    this.currentPage = this.currentPage + 1;
    this.animalsToCards();
  }
  deleteAnimal(id){

    this._animalService.deleteAnimal(id).subscribe(
      res => {
        let json = res.json();
        let code = json.code;let rout = this.router;
        let aux = this;
        if(code == CodesService.OK_CODE){
          this.translateService.get('REQUEST.SUCCESS').subscribe(
            data => {
              this.translation = data;
            }
          );
          var toastOptions:ToastOptions = {
            title: this.translation,
            showClose: true,
            timeout: 1000,
            theme: 'material',
            onRemove: function(toast: ToastData){
              aux.currentPage = 1;
              aux.animalList = [];
              aux.animalsToCards();
            }
          };
          this.toastyService.success(toastOptions);
        }else{
          this.errorMessages = json.message;
          this.modal.open();
        }
      },
      error => {
        let json = error.json();
        this.errorMessages = json.message;
        this.modal.open();
      }
    )
  }
}
