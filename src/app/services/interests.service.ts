import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Interest} from "../models/interest";

@Injectable()
export class InterestsService{
  constructor(
              public _http:Http
  ){}

  getList(){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "interests/list",
        {headers: headers}
    );
  }

  createInterest(interest: Interest) : any {
    var parameters = {
      'name' : interest.name
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/interests/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }


  updateInterest(interest: Interest) : any{
    var parameters = {
      'name' : interest.name
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/interests/update/"+interest.id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteInterest(interest: Interest) : any{
    var parameters = {
      'interest_id' : interest.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/interests/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

}
