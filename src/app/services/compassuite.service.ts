import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Cinema} from "../models/cinema";
import {Movie} from "../models/movie";
import {ProfilesService} from "./profiles.service";
@Injectable()
export class CompassuiteService{
  constructor(
              public _http:Http
  ){}

  getInvestment(month: number, year: number) : any {
    var parameters = {
      'month' : month,
      'year' : year,
    };
    var url = "admin/getInvestment";
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });

    return this._http.post(ApiConfigService.HOST + url,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }
  generateToken(email: string, password: string) : any {
    var parameters = {
      'email' : email,
      'password' : password,
    };
    var url = "admin/generateToken";
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });

    return this._http.post(ApiConfigService.HOST + url,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }
}
