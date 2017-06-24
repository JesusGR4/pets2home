
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";
import {Injectable, ElementRef, ViewChild} from "@angular/core";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class ShelterService{
  constructor(
    public _http:Http, private el: ElementRef
  ){}

  getSheltersByProvince(province){
    var parameters = {
      'province' : province,
    };

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',

    });
    return this._http.post(ApiConfigService.HOST + "getSheltersByProvince",
      parameters,
      {headers: headers}
    )
  }
  getSheltersByProvincePaginate(province, currentPage){
    var parameters = {
      'province' : province,
      'currentPage' : currentPage,
    };

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',

    });
    return this._http.post(ApiConfigService.HOST + "getSheltersByProvincePaginate",
      parameters,
      {headers: headers}
    )
  }
  getShelterById(id){
    var parameters = {
      'shelter_id' : id,
    };

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',
    });

    return this._http.post(ApiConfigService.HOST + "getShelterById",
      parameters,
      {headers: headers}
      )
  }

  createShelter(shelter){

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'X-Requested-With': 'XMLHttpRequest'
    });
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('[type="file"]');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file'+i, inputEl.files.item(i));
      }
      formData.append('length', fileCount);

      formData.append('name', shelter.name);
      formData.append('phone', shelter.phone);
      formData.append('email', shelter.email);
      formData.append('province', shelter.province);
      formData.append('city', shelter.city);
      formData.append('longitude', shelter.longitude);
      formData.append('latitude', shelter.latitude);
      formData.append('description', shelter.description);
      formData.append('schedule', shelter.schedule);
      formData.append('address', shelter.address);
      return this._http.post(ApiConfigService.HOST+'createShelter', formData, {headers:headers});
    }else{
      console.log('mala mujer');
    }
  }
}
