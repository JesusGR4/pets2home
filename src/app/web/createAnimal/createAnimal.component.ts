import {Component, OnInit, ElementRef, NgZone, ViewChild} from '@angular/core';
import {CodesService} from "../../services/codes.service";
import {FormControl} from "@angular/forms";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from "ng2-translate";
import {Router} from "@angular/router";
import {AnimalService} from "../../services/animal.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {Animal} from "../../models/animal";
import {ApiConfigService} from "../../services/apiConfig.service";
declare var $: any;
declare var window: any;

@Component({
  selector:"createAnimal",
  templateUrl:"./createAnimal.component.html",
  providers: [AnimalService]
})

export class CreateAnimalComponent implements OnInit{

  public animal: Animal = new Animal();
  public valid: boolean;
  public sent: boolean = false;
  public filesToUpload: Array<File>;
  public types: Array<string>;
  @ViewChild('modal')
  public modal: ModalComponent;
  public translation : string;
  public errorMessages: any;
  rol : string;
  constructor(private router: Router, private translateService: TranslateService,private toastyService:ToastyService, private el: ElementRef, private _animalService: AnimalService){
  }

  ngOnInit(){
    this.types = this.transformForSelect(['Gato','Perro']);
    $('html,body').animate({
        scrollTop: $("#createAnimal").offset().top},
      'slow');
    this.rol = localStorage.getItem(ApiConfigService.ROL_FIELD);
    if(this.rol != "3"){
      window.location.href = '/notAllowed';
    }
  }
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  createAnimal(){
    this.validateForm();
    if(this.valid == true){

      this._animalService.createAnimal(this.animal).subscribe(
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
              showClose: true,
              timeout: 7500,
              theme: 'material',
              onRemove: function(toast: ToastData){
                rout.navigateByUrl('/myAnimals');
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

  private transformForSelect(datas: Array<any>){
    let result = [];
    for(let i = 0;i<datas.length; i++){
      let label = datas[i];
      result.push({value: label, label: label});
    }
    return result;
  }
  public typeSelected($event){
    if($event.value == "Perro"){
      $('#sizeDiv').show();
    }else{
      $('#sizeDiv').hide();
    }
  }
  private validateForm(){
    this.valid = true;
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('[type="file"]');
    if($('#name').val()==""){
      $('#name-error').show();
      this.valid = false;
    }
    else{
      $('#name-error').hide();
    }
    if($('#breed').val()==""){
      $('#breed-error').show();
      this.valid = false;
    }
    else{
      $('#breed-error').hide();
    }
    if($('#gender').val()==""){
      $('#gender-error').show();
      this.valid = false;
    }
    else{
      $('#gender-error').hide();
    }
    if($('#age').val()<1 ){
      $('#age-error').show();
      this.valid = false;
    }
    else{
      $('#age-error').hide();
    }
    if($('#medicalHistory').val()==""){
      $('#medicalHistory-error').show();
      this.valid = false;
    }
    else{
      $('#medicalHistory-error').hide();
    }
    if($('#size').val()==""  && $('#type').val()==1){
      $('#size-error').show();
      this.valid = false;
    }
    else{
      $('#size-error').hide();
    }
    if(inputEl.files.length == 0){
      $('#input-error').show();
      this.valid = false;
    }else{
      $('#input-error').hide();
    }
    console.log(this.animal.type == false);
    if(this.animal.type == "" || this.animal.type == null){
      $('#type-error').show();
      this.valid = false;
    }else{
      $('#type-error').hide();
    }
  }
}
