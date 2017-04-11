import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {CinemaCompany} from "../models/cinemaCompany";

@Injectable()
export class CinemaCompaniesService{
  constructor(
              public _http:Http
  ){}

  getList(){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/cinemaCompanies/list",
        {headers: headers}
    );
  }

  createCinemaCompany(cinemaCompany: CinemaCompany, imageCinemaCompany: string) : any {
    var parameters = {
      'name' : cinemaCompany.name,
      'phone' : cinemaCompany.phone,
      'email' : cinemaCompany.email,
      'description' : cinemaCompany.description,
      'image_url' : imageCinemaCompany,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemaCompanies/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  updateCinemaCompany(cinemaCompany: CinemaCompany, imageCinemaCompany: string) : any{
    var parameters = {
      'name' : cinemaCompany.name,
      'phone' : cinemaCompany.phone,
      'email' : cinemaCompany.email,
      'description' : cinemaCompany.description,
      'image_url' : imageCinemaCompany,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemaCompanies/update/"+cinemaCompany.id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteCinemaCompany(cinemaCompany: CinemaCompany) : any{
    var parameters = {
      'cinemaCompany_id' : cinemaCompany.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/cinemaCompanies/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

}
