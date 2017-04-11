import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class CitiesService{
  constructor(
              public _http:Http
  ){}

    getList(provinceFilter = null, table_name = null){
        let filter = "?";
        if(provinceFilter != null){
            filter += "province_id="+provinceFilter+"";
        }
        if(table_name != null){
            filter += "&table_name=" + table_name +"";
        }
        let headers = new Headers({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
        });
        return this._http.get(
            ApiConfigService.HOST + "cities/list"+filter,
            {headers: headers}
        );
    }

}
