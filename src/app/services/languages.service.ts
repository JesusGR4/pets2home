import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class LanguagesService{
  constructor(
              public _http:Http
  ){}

  getList(){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "languages/list",
        {headers: headers}
    );
  }

}
