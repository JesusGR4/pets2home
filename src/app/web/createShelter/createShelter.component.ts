

import {Component, OnInit, ElementRef, NgZone, ViewChild} from '@angular/core';
import {CodesService} from "../../services/codes.service";
import {Particular} from "../../models/particular";
import {ParticularService} from "../../services/particular.service";
import {Shelter} from "../../models/shelter.js";
import {Marker} from "../../models/marker";
import {MapsAPILoader} from "angular2-google-maps/core";
import {FormControl} from "@angular/forms";
import {} from "@types/googlemaps"
import {ShelterService} from "../../services/shelter.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from "ng2-translate";
import {Router} from "@angular/router";

declare var $: any;
declare var window: any;
declare var google: any;
@Component({
  selector: "createShelter",
  templateUrl: "./createShelter.component.html",
  providers: [ShelterService]
})
export class CreateShelterComponent implements OnInit{

  public particular: Particular = new Particular();
  public shelter: Shelter = new Shelter();
  public marker: Marker = new Marker();
  public valid: boolean;
  public sent: boolean = false;
  public filesToUpload: Array<File>;
  public provinces: Array<string>;
  public search: {search?: string} = {};
  public latitude = 37.34959;
  public longitude = -5.84431;
  public zoom = 6;
  public searchControl: FormControl;
  public errorMessages: any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild('modal')
  public modal: ModalComponent;
  public translation: string;
  constructor(private router: Router,private translateService:TranslateService,private toastyService:ToastyService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _shelterService: ShelterService, private el: ElementRef){

  }
  ngOnInit(){
    this.searchControl = new FormControl();
    this.provinces = this.transformForSelect(["Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"]);
    $('html,body').animate({
        scrollTop: $("#createShelter").offset().top},
      'slow');
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 20;
        });
      });
    });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }
  createShelter(){
    this.validateForm();
    if(this.valid == true){
      this._shelterService.createShelter(this.shelter).subscribe(
        res => {
          let json = res.json();
          let code = json.code;
          let rout = this.router;
          if(code == CodesService.OK_CODE){
            this.translateService.get('REQUEST.SUCCESS').subscribe(
              data => {
                this.translation = data;
              }
            );
            var toastOptions:ToastOptions = {
              title: this.translation,
              msg: json.message,
              showClose: true,
              timeout: 7500,
              theme: 'material',
              onRemove: function(toast: ToastData){
                rout.navigateByUrl('/index');
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
      );
    }
  }
  private transformForSelect(datas: Array<any>){
    let result = [];
    for(let i = 0;i<datas.length; i++){
      let label = datas[i];
      result.push({value: datas[i], label: label});
    }
    return result;
  }
  mapClicked($event: any){
    this.marker.lat = $event.coords.lat;
    this.shelter.latitude = $event.coords.lat;
    this.marker.lon = $event.coords.lng;
    this.shelter.longitude = $event.coords.lng;
  }

  private validateForm(){
    var phoneReg = new RegExp("^[9|6|7][0-9]{8}$");
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    this.valid = true;
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('[type="file"]');

    if($('#name').val()==""){
      $('#name-error').show();
      this.valid = false;
    }
    else{
      $('#name-error').hide();

    }
    if($('#surname').val()==""){
      $('#surname-error').show();
      this.valid = false;
    }
    else{
      $('#surname-error').hide();
    }
    if(!phoneReg.test($('#phone').val())){
      $('#phone-error').show();
      this.valid = false;
    }else{
      $('#phone-error').hide();
    }

    if($('#city').val()==""){
      $('#city-error').show();
      this.valid = false;
    }
    else{
      $('#city-error').hide();
    }
    if(!pattern.test($('#email').val())){
      $('#email-error').show();
      this.valid = false;
    }else{
      $('#email-error').hide();
    }
    if(this.shelter.latitude== "" || this.shelter.longitude==""){
      $('#location-error').show();
      this.valid = false;
    }else{
      $('#location-error').hide();
    }
    if($('#address').val()==""){
      $('#address-error').show();
      this.valid = false;
    }else{
      $('#address-error').hide();
    }
    if($('#description').val()==""){
      $('#description-error').show();
      this.valid = false;
    }else{
      $('#description-error').hide();
    }
    if($('#schedule').val()==""){
      $('#schedule-error').show();
      this.valid = false;
    }else{
      $('#schedule-error').hide();
    }
    if(inputEl.files.length == 0){
      $('#input-error').show();
      this.valid = false;
    }else{
      $('#input-error').hide();

    }
  }
}


