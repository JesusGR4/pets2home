import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {User} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";
import {ApiConfigService} from "../../../services/apiConfig.service";
import {ProfilesService} from "../../../services/profiles.service";
import {Session} from "../../../models/session";
import {ProvincesService} from "../../../services/provinces.service";
import {Province} from "../../../models/province";
import {CitiesService} from "../../../services/cities.service";
import {City} from "../../../models/city";

declare var $: any;

@Component({
    inputs: ['session'],
    selector: "userManagement",
    templateUrl: "./userManagement.component.html",

})
export class UserManagement implements OnInit{

    @Input()
    public session: Session;
    public users: User[];
    public profileFilter: {youfeelmer?: boolean, provider?: boolean, programmer?: boolean, adminCinema?: boolean, promoter?: boolean} = {};
    public user: User = new User();

    public provinces: Province[] = [];
    public province_id: string;
    public city_id:string;

    public provinceCities: City[];

    public mode: string;
    public $: any;
    constructor(
        private _usersService: UsersService,
        private _messagesService: MessagesService,
        private _profileService: ProfilesService,
        private _provincesService: ProvincesService,
        private _citiesService: CitiesService,
        private router: Router
    ){

    }

    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getUserList();
            this.getProvincesList();
        }
    }

    getUserList(){
        this._usersService.getList(this.profileFilter).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.users = json.data;
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

    getProvincesList(){
      this._provincesService.getList().subscribe(
        res => {
          let json = res.json();
          let code = json.code;
          let message = json.message;
          if(code == CodesService.OK_CODE) {
            this.provinces = this.transformForSelect2(json.data);
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
              this.city_id = this.user.city_id.toString();
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

    createUser(){
        if(this.user.profile_id == ProfilesService.CUSTOMER_PROFILE_ID){
          this.user.city_id = this.city_id;
        }
        this._usersService.createUser(this.user).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#editProfile').modal('hide');
                    this.users.push(json.data);
                    this._messagesService.showSuccessMessage('El usuario se ha creado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }
    updateUser(){
        if(this.user.profile_id == ProfilesService.CUSTOMER_PROFILE_ID){
          this.user.city_id = this.city_id;
        }
        this._usersService.updateUser(this.user).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    $('#editProfile').modal('hide');
                    for(let user of this.users){
                      if(user.id == json.data.id){
                        user = json.data;
                      }
                    }

                    this._messagesService.showSuccessMessage('El usuario se ha actualizado correctamente');
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            }
        )
    }

    addProfile(profile){
        if(profile == ProfilesService.CUSTOMER_STRING){
            this.user.profile_id = ProfilesService.CUSTOMER_PROFILE_ID;
        }
        if(profile == ProfilesService.PROVIDER_STRING){
            this.user.profile_id = ProfilesService.PROVIDER_PROFILE_ID;
        }
        if(profile == ProfilesService.CINEMAS_ADMIN_STRING){
            this.user.profile_id = ProfilesService.CINEMAS_ADMIN_PROFILE_ID;
        }
        if(profile == ProfilesService.CINEMAS_PROGRAMMER_STRING){
            this.user.profile_id = ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID;
        }
        if(profile == ProfilesService.PROMOTER_STRING){
            this.user.profile_id = ProfilesService.PROMOTER_PROFILE_ID;
        }
        $('#'+profile)[0].checked = true;
    }
    changeFormUser(user){
        this.mode = "update";
        this.user = user;
        this.province_id = user.province_id.toString();
        this.city_id = "";
        if(this.user.profile_id == ProfilesService.CUSTOMER_PROFILE_ID && this.user.province_id != null){
          this.getCityList(this.user.province_id);
        }
        let profile = this._profileService.getProfileById(user.profile_id);
        $('#'+profile)[0].click();
    }
    clearFormUser(user){
        this.mode = "new";
        let profile = this.user.profile_id;
        this.user = new User();
        this.user.profile_id = profile;
        this.province_id = "";
        this.city_id = "";
    }


    checkRol(profiles, idRol){
        for(let i=0; i<=profiles.length;i++){
            if(profiles[i] == idRol){
                return true;
            }
        }
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
