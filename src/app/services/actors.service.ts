import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Actor} from "../models/actor";

@Injectable()
export class ActorsService{
  constructor(
              public _http:Http
  ){}

  getList(){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "actors/list",
        {headers: headers}
    );
  }

  createActor(actor: Actor) : any {
    var parameters = {
      'name' : actor.name,
      'surnames' : actor.surnames

    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/actors/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }


  updateActor(actor: Actor) : any{
    var parameters = {
      'name' : actor.name,
      'surnames' : actor.surnames

    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/actors/update/"+actor.id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteActor(actor: Actor) : any{
    var parameters = {
      'actor_id' : actor.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/actors/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

}
