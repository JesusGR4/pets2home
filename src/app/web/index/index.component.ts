import {Component, OnInit, Output, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../../models/session";

import {ApiConfigService} from "../../services/apiConfig.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";

import {Shelter} from "../../models/shelter.js";
import {ShelterService} from "../../services/shelter.service";
declare var Main_carousel: any;
declare var Slider_index: any;
declare var $: any;
declare var window: any;
declare var SpainMap: any;

@Component({
    selector: "index",
    templateUrl: "./index.component.html"
})
export class IndexComponent implements AfterViewInit{
    @Output()
    public session: Session;
    public shelters: Shelter[] = [];
    public search: string;
    constructor(private _messagesService: MessagesService,

                private _shelterService: ShelterService) {

    }



    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }
    ngOnInit(){
      new SpainMap({
        id: 'map', //(Requerido) Elemento HTML en el que se renderizará el mapa
        width: 700, //(Requerido) Ancho del mapa
        height: 400, //(Requerido) Alto del mapa
        fillColor: "#eeeeee", // color de relleno del mapa
        strokeColor: "#bbbbbb", // color de las líneas de frontera
        strokeWidth: 0.7, // ancho de las líneas de frontera
        selectedColor: "#F57C01", // color de relleno de la provincia al pasar el ratón por encima
        animationDuration: 200, // Duración de la animación de salida
        onClick: function(province, mouseevent) {
          // Método que se ejecutará al hacer click sobre una provincia
          this.sheltersToCards(province.name);
        }.bind(this)
      });
      $('#map').children().first().attr('width','100%');
    }
    sheltersToCards(province){
      this.shelters = [];
      this.search = province;
      this._shelterService.getSheltersByProvince(province).subscribe(
        res =>{
          let json = res.json();
          var shelters = json.shelters;
          var numberOfPets = json.counters;
          let totalShelters = (shelters.length >3) ?3 : shelters.length;
          for(var i = 0; i<totalShelters; i++){
            var shelter = new Shelter();
            shelter.name = shelters[i].name;
            shelter.shelter_id = shelters[i].shelter_id;
            shelter.description = shelters[i].description;
            shelter.numberOfPets = numberOfPets[i];
            if(json.images.length != 0 || json.images.length != null){
              if(json.images[i]) shelter.img_url = json.images[i].name;
            }
            this.shelters.push(shelter);

          }
        }
      );
    }

    ngAfterViewInit() {
      Slider_index($);
      this.session = ApiConfigService.getSessionByLocalStorage();
      [].forEach.call(document.querySelectorAll('.tp-arr-titleholder'), function (el) {
        el.style.visibility = 'hidden';
      });
      $('html,body').animate({
          scrollTop: $("#indice").offset().top},
        'slow');
    }

}
