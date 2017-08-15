import { Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../models/movie";
import {MessagesService} from "../../services/messages.service";
import {Session} from "../../models/session";
import {CodesService} from "../../services/codes.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {CountriesService} from "../../services/countries.service";
import {GenresService} from "../../services/genres.service";
import {LanguagesService} from "../../services/languages.service";
import {QualificationsService} from "../../services/qualifications.service";
import {TagsService} from "../../services/tags.service";
import {Genre} from "../../models/genre";
import {Country} from "../../models/country";
import {Tag} from "../../models/tag";
import {Language} from "../../models/language";
import {Qualification} from "../../models/qualification";
import {Shelter} from "../../models/shelter.js";
import {ShelterService} from "../../services/shelter.service";


declare var $: any;
declare var window: any;


@Component({
    selector: "shelterCatalog",
    templateUrl: "./shelterCatalog.component.html"
})

export class ShelterCatalog{

    public session: Session;
    private sub: any;

    public filter: {genres_id?: number[], countries_id?: number[], year?: number, languages_id?: number[],
        qualifications_id?: number[], tags_id?: number[], director_id?: number[], actor_id?: number[]} = {};

    public movies : Movie[] = [];
    public genres : Genre[] = [];
    public countries : Country[] = [];
    public tags : Tag[] = [];
    public languages : Language[] = [];
    public qualifications : Qualification[] = [];
    public shelters: Shelter[] = [];
    public currentPage = 1;
    public totalItems : number = 0;
    public province : string;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private _messagesService: MessagesService,
                private _shelterService: ShelterService,
    ) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.province = params['province'];
        });

      this.sheltersToCards();
      $('html,body').animate({
          scrollTop: $("#shelterCatalog").offset().top},
        'slow');
    }

    ngAfterViewInit(){
      $('html,body').animate({
          scrollTop: $("#shelterCatalog").offset().top},
        'slow');
      this.sub = this.route.params.subscribe(params => {
        this.province = params['province'];
      });
    }

    sheltersToCards(){
    this._shelterService.getSheltersByProvincePaginate(this.province, this.currentPage).subscribe(
      res =>{
        let json = res.json();
        var shelters = json.shelters;
        this.totalItems = shelters.length;
        var numberOfPets = json.counters;
        for(var i = 0; i<this.totalItems; i++){
          var shelter = new Shelter();
          shelter.name = shelters[i].name;
          shelter.shelter_id = shelters[i].shelter_id;
          shelter.description = shelters[i].description;
          shelter.numberOfPets = numberOfPets[i];
          this.shelters.push(shelter);
        }
      }
    );
    }


    more(){
        this.currentPage = this.currentPage + 1;
        this.sheltersToCards();
    }



    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }


}
