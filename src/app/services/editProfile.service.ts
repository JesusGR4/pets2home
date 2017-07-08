
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";
import {Injectable, ElementRef, ViewChild} from "@angular/core";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class EditProfileService{
  constructor(
    public _http:Http, private el: ElementRef
  ){}



  getUserById(){
    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(ApiConfigService.HOST + "particular/getParticular",

      {headers: headers}
      )
  }
  editProfileService(particular){
    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('[type="file"]');
    let formData = new FormData();
    if(inputEl.files.item(0)){
      formData.append('file', inputEl.files.item(0));
    }
    formData.append('name', particular.name);
    formData.append('phone', particular.phone);
    formData.append('email', particular.email);
    formData.append('province', particular.province);
    formData.append('city', particular.city);
    formData.append('surname', particular.surname);

    return this._http.post(ApiConfigService.HOST+'/user/editProfile', formData, {headers:headers});

  }

}
