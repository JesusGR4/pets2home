import {Injectable} from "@angular/core";
import {Response, Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Subject} from 'rxjs/Subject'
import {Session} from "../models/session";

@Injectable()
export class SessionsService{

    private user = new Subject<Session>();

    user$ = this.user.asObservable();

    updateUser(user: Session){
        this.user.next(user);
    }

  constructor(
              public _http:Http
  ){}

  login(form, type){
    var params = {
      'email': form.email,
      'password' : form.password,
      'type' : type,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this._http.post(
      ApiConfigService.HOST+'login',
      params ,
      {
        headers: headers
      }
    )
  }


  resetPassword(form){
    console.log(form.email);
    var params = {
      'email': form.email,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this._http.post(
      ApiConfigService.HOST+'forgotPassword',
      params ,
      {
        headers: headers
      }
    )
  }

  resetForm(form){
    var params = {
      'email' : form.email,
      'token' : form.token,
      'password' : form.password,
      'password_confirmation' : form.password_confirmation,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this._http.post(
      ApiConfigService.HOST+'reset',
      params ,
      {
        headers: headers
      }
    )
  }

  logout() {
    let headers = new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)});

    localStorage.clear();
    return this._http.get(ApiConfigService.HOST+"logout",{headers: headers});
  }

  loginOrRegistration(user, type){
      var parameters = {
          'facebook_id': user.fb_id,
          'name' : user.name,
          'surnames' : user.surnames,
          'email' : user.email,
          'type' : type,
          'token': user.token
      };

      let headers = new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
      });
      return this._http.post(ApiConfigService.HOST + "facebookLoginOrRegistration",
          JSON.stringify(parameters),
          {headers: headers}
      )
  }

  // loggedIn() {
  //   return tokenNotExpired();
  // }


}
