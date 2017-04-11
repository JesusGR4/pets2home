import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {EventsService} from "../../services/events.service";
import {MessagesService} from "../../services/messages.service";
import {CodesService} from "../../services/codes.service";
import {Event} from "../../models/event";

declare var $: any;
declare var window: any;
declare var animatecounters: any;
declare var youtube_gallery: any;



@Component({
    selector: "index",
    templateUrl: "./singleEvent.component.html"
})

export class SingleEventComponent{

    id: number;
    private sub: any;

    public event: Event = new Event();
    public selectedTab:string = "information";

  constructor(
    private route: ActivatedRoute,
    private _eventsService: EventsService,
    private _messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['event_id'];
    });
    this.getEventDetails(this.id)
  }

  getEventDetails(event_id){
    this._eventsService.getDetails(event_id, 0).subscribe(
      res => {
        let json = res.json();
        let code = json.code;
        let message = json.message;
        if(code == CodesService.OK_CODE) {
          this.event = json.data;
          setTimeout(()=>{
            animatecounters();
            youtube_gallery($);
          },1000);
        }else{
          this.handlerError(code, message);
        }
      },
      error => {
        let errorMessage = <any>error;

        if(errorMessage !== null){
          this._messagesService.showServerErrorMessage(errorMessage);
        }
      }
    )
  }

  setSelectedTab(tabName){
    this.selectedTab = tabName;
  }

  private handlerError(code, message){
    if(code == CodesService.INVALID_TOKEN){
      message = MessagesService.INVALID_TOKEN_MESSAGE;
    }
    this._messagesService.showErrorMessage(message);
  }


}
