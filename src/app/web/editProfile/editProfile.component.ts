import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Particular} from "../../models/particular";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from "ng2-translate";
import {EditProfileService} from "../../services/editProfile.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {Router} from "@angular/router";
import {ParticularService} from "../../services/particular.service";
import {CodesService} from "../../services/codes.service";
declare var $: any;
declare var window: any;
@Component({
  selector: "editProfile",
  templateUrl: "./editProfile.component.html",
  providers: [EditProfileService]
})
export class EditProfileComponent implements OnInit{
  public particular: Particular = new Particular();
  public valid: boolean;
  public filesToUpload: Array<File>;
  public provinces: Array<string>;

  public errorMessages: any;
  @ViewChild('modal')
  public modal: ModalComponent;
  public translation: string;
  constructor(private router: Router, private translateService:TranslateService,private toastyService:ToastyService, private _editService:EditProfileService, private el: ElementRef){

  }


  ngOnInit(){
    this.provinces = this.transformForSelect(["Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"]);
    $('html,body').animate({

        scrollTop: $("#baba").offset().top},
      'slow');
    this.getUser();
  }


  editProfile(){
    this.validateForm();

    if(this.valid == true){
      this._editService.editProfileService(this.particular).subscribe(
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
                localStorage.setItem(ApiConfigService.PHOTO_FIELD, json.image.name);
                location.reload();
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

  private getUser(){
    this._editService.getUserById().subscribe(
      res => {
        let json = res.json()
        this.convertToParticular(json);
      },
      error => {
        window.alert('error');
      }
    );
  }
  private validateForm(){
    var phoneReg = new RegExp("^[9|6|7][0-9]{8}$");
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    this.valid = true;
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
    if(this.particular.province==null || this.particular.province==""){
      $('#province-error').show();
      this.valid = false;
    }
    else{
      $('#province-error').hide();
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

  }

  completeUrl(url: string) {
    return ApiConfigService.PROFILE_IMAGE_FOLDER + url;
  }
  private convertToParticular(json){
    ;
    this.particular.id = json.user.id;
    this.particular.name = json.user.name;
    this.particular.surname = json.particular.surname;
    this.particular.phone = json.user.phone;
    if(json.image != null){
      this.particular.image_url = json.image.name;
    }
    this.particular.province = json.user.province;
    this.particular.city = json.user.city;
    this.particular.email = json.user.email;
  }
}


