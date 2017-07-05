import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {MessagesService} from "../../../../services/messages.service";
import {ApiConfigService} from "../../../../services/apiConfig.service";
import {CodesService} from "../../../../services/codes.service";
import {LogsService} from "../../../../services/logs.service";
import {Session} from "../../../../models/session";
import {Log} from "../../../../models/log";

declare var TableJS:any;
declare var $:any;
declare var window:any;


@Component({
    selector: "usersTimeline",
    templateUrl: "./usersTimeline.component.html",

})
export class UsersTimeline {


    id: number;
    private sub: any;

    public session : Session;
    public logs: Log[];
    public log: Log;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _messagesService : MessagesService,
      private _logsServicce: LogsService,
    ) {

    }

    ngAfterViewInit() {
        TableJS($, window);
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['customer_id'];
      });
      this.session = ApiConfigService.getSessionByLocalStorage();
      if(this.session.name == null){
        this.router.navigate(['/admin-panel/loginPage']);
      }else if(this.session.profile != 100){
        this.router.navigate(['/admin-panel/dashboard/noPermissions']);
      }else{
        this.logs = [];
        this.getCustomerLogs();
      }
    }

    getCustomerLogs() : void{
      this._logsServicce.getList(this.id).subscribe(
        res => {
          let json = res.json();
          let code = json.code;
          let message = json.message;
          if(code == CodesService.OK_CODE) {
            this.logs = json.data;
            this.log = this.logs[0];
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

    private handlerError(code, message){
      if(code == CodesService.INVALID_TOKEN){
        message = MessagesService.INVALID_TOKEN_MESSAGE;
      }
      this._messagesService.showErrorMessage(message);
    }

}
