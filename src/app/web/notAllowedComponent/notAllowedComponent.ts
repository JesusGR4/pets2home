
import { Component, OnInit} from '@angular/core';
import {ApiConfigService} from "../../services/apiConfig.service";

@Component({
  selector: "not-allowed-component",
  templateUrl: "./notAllowedComponent.component.html",

})
export class NotAllowedComponent implements OnInit{
  rol: string;
  constructor(
  ){

  }

  ngOnInit(){
    this.rol = localStorage.getItem(ApiConfigService.ROL_FIELD);
  }
}
