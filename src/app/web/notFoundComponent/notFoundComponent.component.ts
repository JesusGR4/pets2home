
import { Component, OnInit} from '@angular/core';
import {ApiConfigService} from "../../services/apiConfig.service";

@Component({
  selector: "not-found-component",
  templateUrl: "./notFoundComponent.component.html",

})
export class NotFoundComponent implements OnInit{
  rol: string;
  constructor(
  ){

  }

  ngOnInit(){
    this.rol = localStorage.getItem(ApiConfigService.ROL_FIELD);
  }
}
