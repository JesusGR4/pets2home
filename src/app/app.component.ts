import {Component, Output} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {ApiConfigService} from "./services/apiConfig.service";
import {Session} from "./models/session";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output()
  public session: Session = null;
  constructor(private translate: TranslateService) {
    translate.addLangs(["sp", "en"]);
    if(localStorage.getItem(ApiConfigService.LANGUAGE)==null){
      translate.use('sp');
      localStorage.setItem(ApiConfigService.LANGUAGE, 'sp');
    }else{
      translate.use(localStorage.getItem(ApiConfigService.LANGUAGE));
    }
  }
  ngOnInit(){
    this.session = ApiConfigService.getSessionByLocalStorage();

  }


}
