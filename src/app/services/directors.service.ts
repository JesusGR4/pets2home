import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Director} from "../models/director";

@Injectable()
export class DirectorsService{
  constructor(
              public _http:Http
  ){}

  getList(){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "directors/list",
        {headers: headers}
    );
  }

  createDirector(director: Director) : any {
    var parameters = {
      'name' : director.name,
      'surnames' : director.surnames

    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/directors/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }


  updateDirector(director: Director) : any{
    var parameters = {
      'name' : director.name,
      'surnames' : director.surnames

    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/directors/update/"+director.id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteDirector(director: Director) : any{
    var parameters = {
      'director_id' : director.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/directors/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

}
