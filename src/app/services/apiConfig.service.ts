import {Injectable} from "@angular/core";
import {Session} from "../models/session";
import {TranslateService} from "ng2-translate";

@Injectable()
export class ApiConfigService{
  public static HOST = "http://localhost/petstohomews/public/api/";

  public static ID_FIELD = "petstohome-id";
  // Si se cambia el token, cambiar tambi�n en drozone.js -> Dropzone.prototype._finished
  public static TOKEN_FIELD = "petstohome-token";
  public static NAME_FIELD = "petstohome-name";
  public static SURNAMES_FIELD = "petstohome-surnames";
  public static PHOTO_FIELD = "petstohome-photo";
  public static ROL_FIELD = "petstohome-rol";
  public static ADMIN_FIELD = "petstohome-admin";
  public static USERNAME_FIELD = "petstohome-username";
  public static EMAIL_FIELD = "petstohome-email";
  public static CUSTOMER_PROVINCE = "petstohome-province";
  public static CUSTOMER_CITY = "petstohome-city";
  public static LANGUAGE = "LANGUAGE-FIELD";

  public static HOST2 = "http://localhost/petstohomews/public/";
  public static PROFILE_IMAGE_FOLDER = ApiConfigService.HOST2 + 'img/';
  constructor(){

  }


  public static setImage(image){
    localStorage.setItem(ApiConfigService.PHOTO_FIELD, image);
  }
  public static setSession(data, token = null){
    if(token != null){
      localStorage.setItem(ApiConfigService.TOKEN_FIELD, token);
    }
    localStorage.setItem(ApiConfigService.NAME_FIELD, data.name);
    localStorage.setItem(ApiConfigService.SURNAMES_FIELD, data.surnames);
    localStorage.setItem(ApiConfigService.PHOTO_FIELD, data.profile_img_url);
    localStorage.setItem(ApiConfigService.ROL_FIELD, data.role_id);
    localStorage.setItem(ApiConfigService.ADMIN_FIELD, data.admin);
    localStorage.setItem(ApiConfigService.ID_FIELD, data.id);
    localStorage.setItem(ApiConfigService.EMAIL_FIELD, data.email);
    localStorage.setItem(ApiConfigService.USERNAME_FIELD, data.username);
    if(data.city_id){
      localStorage.setItem(ApiConfigService.CUSTOMER_PROVINCE, data.province_id);
      localStorage.setItem(ApiConfigService.CUSTOMER_CITY, data.city_id);
    }
  }
  public static getSessionByLocalStorage(){
    let session = new Session();
    console.log(localStorage.getItem(ApiConfigService.TOKEN_FIELD));
    console.log(localStorage.getItem(ApiConfigService.NAME_FIELD));
    if(localStorage.getItem(ApiConfigService.TOKEN_FIELD) != null && localStorage.getItem(ApiConfigService.NAME_FIELD) != null
        && localStorage.getItem(ApiConfigService.TOKEN_FIELD) != null ){
      session.id = localStorage.getItem(ApiConfigService.ID_FIELD);
      session.token = localStorage.getItem(ApiConfigService.TOKEN_FIELD);
      session.name = localStorage.getItem(ApiConfigService.NAME_FIELD);
      session.surnames = localStorage.getItem(ApiConfigService.SURNAMES_FIELD);
      session.profile = parseInt(localStorage.getItem(ApiConfigService.ROL_FIELD));
      session.admin = parseInt(localStorage.getItem(ApiConfigService.ADMIN_FIELD));
      session.profile_img_url = localStorage.getItem(ApiConfigService.PHOTO_FIELD);
      session.email = localStorage.getItem(ApiConfigService.EMAIL_FIELD);
      session.username = localStorage.getItem(ApiConfigService.USERNAME_FIELD);
      if(localStorage.getItem(ApiConfigService.CUSTOMER_CITY)){
        session.province_id = localStorage.getItem(ApiConfigService.CUSTOMER_PROVINCE);
        session.city_id = localStorage.getItem(ApiConfigService.CUSTOMER_CITY);
      }
    }
    console.log(session.profile_img_url);
    return session;
  }

  public static setSessionUserProfileImg(src){
    localStorage.setItem(ApiConfigService.PHOTO_FIELD, src);
  }

}
