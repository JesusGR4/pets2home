import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class RoomsService{
  constructor(
              public _http:Http
  ){}

  getListByCinema(cinema_id){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/rooms/listByCinema/"+cinema_id,
        {headers: headers}
    );
  }
  updateByCinema(cinema_id, rooms){
    var parameters = {
      'rooms' : rooms,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/rooms/updateByCinema/"+cinema_id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

}
