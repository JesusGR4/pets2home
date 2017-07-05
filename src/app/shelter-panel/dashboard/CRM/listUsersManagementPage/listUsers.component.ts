import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../../../../models/session";
import {Customer} from "../../../../models/customer";
import {CustomersService} from "../../../../services/customers.service";
import {CodesService} from "../../../../services/codes.service";
import {MessagesService} from "../../../../services/messages.service";
import {ApiConfigService} from "../../../../services/apiConfig.service";
import {CitiesService} from "../../../../services/cities.service";
import {City} from "../../../../models/city";

declare var TableJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "listUsers",
    templateUrl: "./listUsers.component.html",

})
export class ListUsers {

    @Input()
    public session : Session;
    public customers : Customer[];
    public cities: City[];
    public level0 = null;
    public level1 = null;
    public level2 = null;
    public level3 = null;

    public filter : {name?: string, email?: string, city_id?: number, level_ids?: number[]} = {};
    public email : {subject?: string, text?: string, template?: boolean} = {};

    constructor(
        private router: Router,
        private _customersService : CustomersService,
        private _messagesService : MessagesService,
        private _citiesService: CitiesService
    ) {

    }

    public currentPage = 1;

    ngAfterViewInit() {
        TableJS($, window);
    }

    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        this.customers = [];
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getCustomerList();
            this.getCityList(null);
        }
    }

    setSelectedTemplate(value){
      this.email.template = value;
    }

    sendEmail(){
      let selected : number [] = [];
      for(let i = 0; i < this.customers.length; i++){
        let customer : any= this.customers[i];
        if(customer.selected){
          selected.push(customer.customer_id);
        }
      }
      if(selected.length == 0){
        this.handlerError(CodesService.BAD_OPERATION, 'Debes señalar almenos un usuario');
        return false;
      }

      this._customersService.sendEmail(selected, this.email).subscribe(
        res => {
          let json = res.json();
          let code = json.code;
          let message = json.message;
          if(code == CodesService.OK_CODE) {
            window.alert('OK');
            this.email = {};
          }else{
            this.handlerError(code, message);
          }
        },
        error => {
          let errorMessage = <any>error;

          if(errorMessage !== null){
            this._messagesService.showServerErrorMessage(errorMessage);
          }
        })

    }

    getCustomerList(){
        this._customersService.getList(this.currentPage, this.filter).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.customers = json.data;
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            })
        ;
    }
    export(){
        let selected : number [] = [];
        for(let i = 0; i < this.customers.length; i++){
            let customer : any= this.customers[i];
            if(customer.selected){
                selected.push(customer.customer_id);
            }
        }
        if(selected.length == 0){
            this.handlerError(CodesService.BAD_OPERATION, 'Debes señalar almenos un usuario');
            return false;
        }

        this._customersService.export(selected).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    window.alert(json.data);
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            })
        ;
    }

    filterCustomers(){
        this.filter.level_ids = [];
        if(this.level0 != null && this.level0 != false){
            this.filter.level_ids.push(0);
        }
        if(this.level1 != null && this.level1 != false){
            this.filter.level_ids.push(1);
        }
        if(this.level2 != null && this.level2 != false){
            this.filter.level_ids.push(2);
        }
        if(this.level3 != null && this.level3 != false){
            this.filter.level_ids.push(3);
        }
        this.getCustomerList();
    }

    getCityList(filter) : void{
        this._citiesService.getList(filter, "customers").subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    this.cities = this.transformForSelect2(json.data);
                }else{
                    this.handlerError(code, message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            })
        ;
    }

    listPaginate($event){
        this.currentPage = $event;
        this.getCustomerList();
    }

    selectAll(){
        let select = $('#select').prop('checked');

        for(let i = 0; i < this.customers.length; i++){
            (<any> this.customers[i]).selected = select;
        }
    }

    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }

    private transformForSelect2(datas: Array<any>){
        let result = [];
        for(let i=0;i<datas.length; i++){
            let value = datas[i].id;
            let label = datas[i].name;
            if(datas[i].surnames != null){
                label = label + " " + datas[i].surnames;
            }
            result.push({value : value.toString(), label : label});
        }
        return result;
    }




}
