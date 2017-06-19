

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
import {NotificationsService} from "angular2-notifications/dist";

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
  constructor(private _notificationService:NotificationsService,  private _particularService: ParticularService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private _shelterService: ShelterService){

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
          this.zoom = 12;
        });
      });
    });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  createShelter(){
    this._shelterService.createShelter(this.shelter).subscribe(
      res => {
        let json = res.json();
        let code = json.code;
        if(code == CodesService.OK_CODE){
          this.errorMessages = json.message;
          this._notificationService.success(
            'Some Title',
            'Some Content',
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 10
            }
          )
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

}


