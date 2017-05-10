import {Component, OnInit, Output, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../../models/session";
import {Movie} from "../../models/movie";
import {ApiConfigService} from "../../services/apiConfig.service";
import {MessagesService} from "../../services/messages.service";
import {MoviesService} from "../../services/movies.service";
import {CodesService} from "../../services/codes.service";
import {EventsService} from "../../services/events.service";
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

    public movies : Movie[] = [];
    public events : Event[] = [];
    public shelters: Shelter[] = [];
    public search: string;
    constructor(private _messagesService: MessagesService,
                private _moviesService: MoviesService,
                private _eventsService: EventsService,
                private _shelterService: ShelterService) {

    }

    getMovieList(){
        this._moviesService.getCatalog(1, null).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.movies = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            });
    }
    getEventList(){
        this._eventsService.getCatalog(1, {geo: 1}).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.events = json.data;
                    let interval = setTimeout(function(interval){
                        Main_carousel($);
                    }, 1000);
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;
                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            });
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
    }
    sheltersToCards(province){
      this.shelters = [];
      this.search = province;
      this._shelterService.getSheltersByProvince(province).subscribe(
        res =>{

          let json = res.json();
          var shelters = json.shelters;
          for(var i = 0; i<4; i++){
            var shelter = new Shelter();
            console.log(shelters[i]);
            shelter.name = shelters[i].name;
            shelter.shelter_id = shelters[i].shelter_id;
            shelter.description = shelters[i].description;
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

    }

}
