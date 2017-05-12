
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class ShelterService{
  constructor(
    public _http:Http
  ){}

  getSheltersByProvince(province){
    var parameters = {
      'province' : province,
    };

    let headers = new Headers({
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
      'Content-Type': 'application/json',

    });
    return this._http.post(ApiConfigService.HOST + "getSheltersByProvincePaginate",
      parameters,
      {headers: headers}
    )
  }
}
