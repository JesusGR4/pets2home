import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Session} from "../../../models/session";
import {Customer} from "../../../models/customer";
import {CustomersService} from "../../../services/customers.service";
import {CodesService} from "../../../services/codes.service";
import {MessagesService} from "../../../services/messages.service";
import {ApiConfigService} from "../../../services/apiConfig.service";
import {CitiesService} from "../../../services/cities.service";
import {City} from "../../../models/city";
import {CompassuiteService} from "../../../services/compassuite.service";

declare var TableJS:any;
declare var $:any;
declare var window:any;
declare var generateTable:any;


@Component({
    selector: "listUsers",
    templateUrl: "./compassuite.component.html",

})
export class Compassuite {

    @Input()
    public session : Session;

    constructor(
        private router: Router,
        private _messagesService: MessagesService,
        private _compassuiteService: CompassuiteService
    ) {

    }

    public currentPage = 1;

    ngAfterViewInit() {
        TableJS($, window);
    }

    ngOnInit() {
        this.session = ApiConfigService.getSessionByLocalStorage();
        if(this.session.name == null){
            this.router.navigate(['/admin-panel/loginPage']);
        }else if(this.session.profile != 100){
            this.router.navigate(['/admin-panel/dashboard/noPermissions']);
        }else{
            this.getCompassuiteInvestment();
        }
    }

    public getCompassuiteInvestment(){
        this._compassuiteService.getInvestment(3, 2017).subscribe(
            res => {
                let json = res.json();
                let code = json.code;
                let message = json.message;
                if(code == CodesService.OK_CODE) {
                    generateTable(json.data);
                }else{
                    this._messagesService.showErrorMessage(json.message);
                }
            },
            error => {
                let errorMessage = <any>error;

                if(errorMessage !== null){
                    this._messagesService.showServerErrorMessage(errorMessage);
                }
            });
    }

    private handlerError(code, message){
        if(code == CodesService.INVALID_TOKEN){
            message = MessagesService.INVALID_TOKEN_MESSAGE;
        }
        this._messagesService.showErrorMessage(message);
    }


}
