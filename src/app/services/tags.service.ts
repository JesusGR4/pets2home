import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Tag} from "../models/tag";

@Injectable()
export class TagsService{
  constructor(
              public _http:Http
  ){}

  getList(){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "tags/list",
        {headers: headers}
    );
  }

  createTag(tag: Tag) : any {
    var parameters = {
      'name' : tag.name,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/tags/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }


  updateCinema(tag: Tag) : any{
    var parameters = {
      'name' : tag.name,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/tags/update/"+tag.id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteTag(tag: Tag) : any{
    var parameters = {
      'tag_id' : tag.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/tags/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

}
