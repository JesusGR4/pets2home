import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Cinema} from "../models/cinema";

@Injectable()
export class CinemasService{
  constructor(
              public _http:Http
  ){}

  getList(cinemaFilter = null, user = null){
    let filter = "";
    if(cinemaFilter != null){
      let company = cinemaFilter[0];
      let city = cinemaFilter[1];

      filter = "?company_id="+company+"&city_id="+city;
    }
    let url = "";
    if(user == null){
      url = "admin/cinemas/list";
    }else{
      url = "user/cinemas/list";
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + url + filter,
        {headers: headers}
    );
  }
  getPublicList(cinemaFilter = null, user = null){
    let filter = "";
    if(cinemaFilter != null){
      let company = cinemaFilter[0];
      let city = cinemaFilter[1];

      filter = "?company_id="+company+"&city_id="+city;
    }
    let url = "cinemas/list";
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + url + filter,
        {headers: headers}
    );
  }
  getDetails(cinema_id: number): any{
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this._http.get(
        ApiConfigService.HOST + "cinemas/details/"+cinema_id,
        {headers: headers}
    );
  }
  createCinema(cinema: Cinema, city_id : string) : any {
    var parameters = {
      'name' : cinema.name,
      'cinema_company_id' : cinema.cinema_company_id,
      'address' : cinema.address,
      'city_id' : city_id,
      'phone' : cinema.phone,
      'email' : cinema.email,
      'web' : cinema.web,
      'google_map_url' : cinema.google_map_url,
      'fb_url' : cinema.fb_url,
      'tw_url' : cinema.tw_url,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemas/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  updateCinema(cinema: Cinema, city_id: string) : any{
    var parameters = {
      'name' : cinema.name,
      'cinema_company_id' : cinema.cinema_company_id,
      'address' : cinema.address,
      'city_id' : parseInt(city_id),
      'phone' : cinema.phone,
      'email' : cinema.email,
      'web' : cinema.web,
      'google_map_url' : cinema.google_map_url,
      'fb_url' : cinema.fb_url,
      'tw_url' : cinema.tw_url,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemas/update/"+cinema.id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteCinema(cinema: Cinema) : any{
    var parameters = {
      'cinema_id' : cinema.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemas/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  publishCinema(cinema: Cinema) : any{
    var parameters = {
      'cinema_id' : cinema.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemas/publish",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  unpublishCinema(cinema: Cinema) : any{
    var parameters = {
      'cinema_id' : cinema.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemas/unpublish",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  featureCinema(cinema: Cinema) : any{

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/cinemas/featured/"+cinema.id,
        {headers: headers}
    );
  }



}
