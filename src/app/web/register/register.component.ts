

import {Component, OnInit, ViewChild} from '@angular/core';
import {CodesService} from "../../services/codes.service";
import {Particular} from "../../models/particular";
import {ParticularService} from "../../services/particular.service";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from "ng2-translate";
import {Router} from "@angular/router";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
@Component({
  selector: "register",
  templateUrl: "./register.component.html"
})
export class RegisterPageComponent{

  public particular: Particular = new Particular();
  public valid: boolean;
  public sent: boolean = false;
  public provinces: Array<string>;
  public errorMessages: any;
  @ViewChild('modal')
  public modal: ModalComponent;
  public translation: string;
  constructor(private router: Router,private _particularService: ParticularService, private translateService:TranslateService,private toastyService:ToastyService){

  }
  ngOnInit(){
    this.provinces = this.transformForSelect(["Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"]);
    $('html,body').animate({
        scrollTop: $("#register").offset().top},
      'slow');
  }

  registerFunction(form){
    this.sent = true;
    this.validateForm();
    if(this.valid == true){
      console.log(this.particular);
        this._particularService.register(this.particular).subscribe(
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
                timeout: 3000,
                theme: 'material',
                onRemove: function(toast: ToastData){
                  rout.navigateByUrl('/login');
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
    if($('#password').val()==""){
      $('#password-error').show();
      this.valid = false;
    }else{
      $('#password-error').hide();
    }
    if($('#password').val()!=$('#confirm').val()){
      $('#confirm-error').show();
      this.valid = false;
    }else{
      $('#confirm-error').hide();
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

}
