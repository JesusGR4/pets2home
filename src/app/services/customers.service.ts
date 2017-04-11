import {Injectable} from "@angular/core";
import {Response, Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class CustomersService{
  constructor(
              public _http:Http
  ){}

  getList(currentPage : number, filters = null){
    let filter = "";
    if (filters != null) {
      if(filters.name && filters.name.length > 0){
        filter += "&name=" + filters.name +"";
      }
      if(filters.email && filters.email.length > 0){
        filter += "&email=" + filters.email +"";
      }
      if(filters.city_id && filters.city_id.length > 0){
        filter += "&city_id=" + filters.city_id +"";
      }
      if(filters.level_ids && filters.level_ids.length > 0){
        filter += "&level_ids=[" + filters.level_ids + "]";
      }
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/customers/list/"+currentPage+"?"+filter,
        {headers: headers}
    );
  }
  export(selected){
    var parameters = {
      'customers_id' : selected,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/customers/export",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  sendEmail(selected, email){
    var parameters = {
      'customers_id' : selected,
      'subject': email.subject,
      'text': email.text,
      'template': email.template,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/log/sendEmail",
      JSON.stringify(parameters),
      {headers: headers}
    )
  }
}
