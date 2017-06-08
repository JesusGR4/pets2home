import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class ParticularService{

  public constructor(public _http: Http){

  }

  register(particular){


    let headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this._http.post(
      ApiConfigService.HOST+'register',
      particular,
      {
        headers: headers
      }
    )
  }

}

