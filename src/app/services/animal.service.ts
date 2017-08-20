
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
  getMyAnimals(currentPage){
    var parameters = {
      'currentPage' : currentPage,
    };

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "shelter/getMyAnimals",
      parameters,
      {headers: headers}
    )
  }
  getAnimalById(animal_id){
    var parameters = {
      'animal_id' : animal_id,
    };

    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'Content-Type': 'application/json',

    });
    return this._http.post(ApiConfigService.HOST + "getAnimalById",
      parameters,
      {headers: headers}
    )
  }

  createAnimal(animal){
    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('[type="file"]');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file'+i, inputEl.files.item(i));
      }

      formData.append('length', fileCount);
      formData.append('name', animal.name);
      formData.append('breed', animal.breed);
      formData.append('gender', animal.gender);
      formData.append('age', animal.age);
      formData.append('medicalHistory', animal.medicalHistory);
      formData.append('type', animal.type);
      if(animal.type == "Perro"){
        formData.append('type', 1);
      }else{
        formData.append('type', 0);
      }
      formData.append('size', animal.size);

      return this._http.post(ApiConfigService.HOST+'shelter/createAnimal', formData, {headers:headers});
    }else{

    }
  }

  deleteAnimal(id){
    var parameters = {
      'animal_id' : id,
    };
    let headers = new Headers({
      'Content-Language': localStorage.getItem(ApiConfigService.LANGUAGE),
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });

    return this._http.post(ApiConfigService.HOST+'shelter/deleteAnimal', parameters, {headers:headers});
  }
}
