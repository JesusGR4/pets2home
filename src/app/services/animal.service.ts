
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";
import {Injectable, ElementRef, ViewChild} from "@angular/core";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class AnimalService {
  constructor(public _http: Http, private el: ElementRef) {
  }

  listAnimals(shelter_id){
    var parameters = {
      'shelter_id' : shelter_id,
    };

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',
    });
    return this._http.post(ApiConfigService.HOST + "getAnimalsByShelterId",
      parameters,
      {headers: headers}
    )
  }

  getAnimalsBySheltersPaginate(shelter_id, currentPage){
    var parameters = {
      'shelter_id' : shelter_id,
      'currentPage' : currentPage,
    };

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',

    });
    return this._http.post(ApiConfigService.HOST + "getAnimalsByShelter",
      parameters,
      {headers: headers}
    )
  }
}
