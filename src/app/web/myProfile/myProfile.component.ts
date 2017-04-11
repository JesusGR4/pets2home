import { Component, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../../models/session";
import {UsersService} from "../../services/users.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {ProfilesService} from "../../services/profiles.service";
import {ApiConfigService} from "../../services/apiConfig.service";
import {ProvincesService} from "../../services/provinces.service";
import {Province} from "../../models/province";
import {CitiesService} from "../../services/cities.service";
import {City} from "../../models/city";

declare var Dropzone: any;


@Component({
    inputs: ['session'],
    selector: "myProfile",
    templateUrl: "./myProfile.component.html"
})
export class MyProfileComponent{
    public user: Session = new Session();
    public password: {oldpassword?:string, newpassword?:string, newpassword_confirmation?:string} = {};
    public sendChangePassword: boolean = false;
    public sendUpdateProfile: boolean = false;

    public provinces: Province[] = [];
    public province_id: string;


    public provinceCities: City[];
    public city_id: string;


    constructor(
        private router: Router,
        private _messagesService: MessagesService,
        private _usersService: UsersService,
        private _provincesService: ProvincesService,
        private _citiesService: CitiesService

    ){

    }

    ngOnInit(){
        this.user = ApiConfigService.getSessionByLocalStorage();
        if(this.user.profile == null){
            this.router.navigate(['/index']);
        }else{
          if(this.user.profile == ProfilesService.CUSTOMER_PROFILE_ID){
            if(this.user.city_id != "" && this.user.city_id != null){
              this.getProvincesList(true);
              this.getCityList(this.user.province_id);

              this.province_id = this.user.province_id;
              this.city_id = this.user.city_id;
            }else{
              this.getProvincesList();
            }
          }
        }
    }
    // Al cambiar este m�todo, cambiar tambi�n en profileManagement.component-> getDetails

    onChangePassword(form){
        this.sendChangePassword = true;
        if(form.valid){
            this._usersService.changePassword(this.password).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    let message = json.message;
                    if(code == CodesService.OK_CODE) {
                        alert('OK!');
                    }else{
                        this.handlerError(code, message);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    onUpdateProfile(form){
        this.sendUpdateProfile = true;
        if(this.user.profile == ProfilesService.CUSTOMER_PROFILE_ID){
          this.user.city_id = this.city_id;
        }
        if(form.valid){
            this._usersService.updateProfile(this.user).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    let message = json.message;
                    if(code == CodesService.OK_CODE) {
                        ApiConfigService.setSession(json.data);
                        alert('OK!');
                    }else{
                        this.handlerError(code, message);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    onFileUpload(input){
        if(input.value != ""){
            this._usersService.changeProfileImage(input.value).subscribe(
                    res => {
                    let json = res.json();
                    let code = json.code;
                    let message = json.message;
                    if(code == CodesService.OK_CODE) {
                        Dropzone.forElement(".dropzone").removeAllFiles(true);
                        alert('OK!');
                        this.user.profile_img_url = json.data;
                        ApiConfigService.setSessionUserProfileImg(json.data);
                    }else{
                        this.handlerError(code, message);
                    }
                },
                    error => {
                    let errorMessage = <any>error;

                    if(errorMessage !== null){
                        this._messagesService.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
                    }
                }
            )
        }
    }

    getProvincesList(hasProvince = null){
      this._provincesService.getList().subscribe(
        res => {
          let json = res.json();
          let code = json.code;
          let message = json.message;
          if(code == CodesService.OK_CODE) {
            this.provinces = this.transformForSelect2(json.data);
            if(hasProvince != null){
              setTimeout(()=>{
                this.province_id = this.user.province_id;
              },1000);
            }
          }else{
            this.handlerError(code, message);
          }
        },
        error => {
          let errorMessage = <any>error;

          if(errorMessage !== null){
            this._messagesService.showServerErrorMessage(errorMessage);
          }
        })
      ;
    }

  getCitiesByProvince(province){
    this.provinceCities = [];
    this._citiesService.getList(province.value).subscribe(
      res => {
        let json = res.json();
        let code = json.code;
        let message = json.message;
        if(code == CodesService.OK_CODE) {
          this.provinceCities = this.transformForSelect2(json.data);
        }else{
          this.handlerError(code, message);
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage !== null){
          this._messagesService.showServerErrorMessage(errorMessage);
        }
      })
    ;
  }
  getCityList(province_id) : void{
    this._citiesService.getList(province_id).subscribe(
      res => {
        let json = res.json();
        let code = json.code;
        let message = json.message;
        if(code == CodesService.OK_CODE) {
          this.provinceCities = this.transformForSelect2(json.data);
          setTimeout(()=>{
            this.city_id = this.user.city_id;
          },1000);

        }else{
          this.handlerError(code, message);
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage !== null){
          this._messagesService.showServerErrorMessage(errorMessage);
        }
      })
    ;
  }

  private handlerError(code, message){
    if(code == CodesService.INVALID_TOKEN){
      message = MessagesService.INVALID_TOKEN_MESSAGE;
    }
    this._messagesService.showErrorMessage(message);
  }

  private transformForSelect2(datas: Array<any>){
    let result = [];
    for(let i=0;i<datas.length; i++){
      let value = datas[i].id;
      let label = datas[i].name;
      if(datas[i].surnames != null){
        label = label + " " + datas[i].surnames;
      }
      result.push({value : value.toString(), label : label});
    }
    return result;
  }

}
