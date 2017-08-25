import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ApiConfigService} from "../../../services/apiConfig.service";
import {ShelterService} from "../../../services/shelter.service";
import {Shelter} from "../../../models/shelter.js";
import {TranslateService} from "ng2-translate";
import {ToastyService, ToastOptions, ToastData} from "ng2-toasty";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

declare var TableJS:any;
declare var $:any;
declare var window:any;
declare var Dropzone: any;


@Component({
    selector: "pendingShelters",
    templateUrl: "./pendingShelters.component.html",
    providers:[ShelterService]

})
export class PendingSheltersManagement implements OnInit{


  public shelters: Shelter[] = [];
  private totalItems:any;
  private currentPage=1;
  public translation: string;
  public pending: {shelter_id?: string, reason?: string} = {};
  @ViewChild('modal')
  public modal: ModalComponent;
    constructor(private _shelterService: ShelterService,private translateService:TranslateService,
  private toastyService:ToastyService

    ){

    }


    ngOnInit() {
      TableJS($,window);
      this.getPendingShelters();
    }

    getPendingShelters(){
      this.shelters = [];
      this._shelterService.getPendingShelters(this.currentPage).subscribe(
        res => {
          let json = res.json();
          var shelters = json.shelters;
          this.totalItems = json.totalItems;
          for (var i = 0; i < this.totalItems; i++) {
            var shelter = new Shelter();
            shelter.name = shelters[i].user_name;
            shelter.created = shelters[i].created;
            shelter.shelter_id = shelters[i].shelter_id;
            shelter.user_id = shelters[i].user_id;
            shelter.province = shelters[i].shelter_province;
            shelter.city = shelters[i].shelter_city;
            this.shelters.push(shelter);
          }
        }
      );
    }
  ngAfterViewInit() {
    TableJS($,window);
  }

  listPaginatePending($event){
    this.currentPage = $event;
  }
  acceptShelter(shelter_id){
    this._shelterService.acceptShelter(shelter_id).subscribe(
      res => {
        let json = res.json();
        let aux = this;
        this.translateService.get('PENDING.ACCEPT').subscribe(
          data => {
            this.translation = data;
          }
        );
        var toastOptions:ToastOptions = {
          title: this.translation,
          msg: json.message,
          showClose: true,
          timeout: 3000,
          theme: 'material',
          onRemove: function(toast: ToastData){
            aux.getPendingShelters();
          }
        };
        this.toastyService.success(toastOptions);
      }
    )
  }

  openModalShelter(shelter_id){
    this.pending.shelter_id = shelter_id;
    this.modal.open();
  }
  closeModal(){
    this._shelterService.rejectShelter(this.pending).subscribe(
      res => {
        let json = res.json();
        let aux = this;
        this.translateService.get('PENDING.REJECT').subscribe(
          data => {
            this.translation = data;
          }
        );
        var toastOptions:ToastOptions = {
          title: this.translation,
          msg: json.message,
          showClose: true,
          timeout: 3000,
          theme: 'material',
          onRemove: function(toast: ToastData){
            aux.getPendingShelters();
            aux.modal.close()
          }
        };
        this.toastyService.success(toastOptions);
      }
    )

  }
}
