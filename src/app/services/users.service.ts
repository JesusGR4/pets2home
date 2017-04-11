import {Injectable} from "@angular/core";
import {Response, Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
//import {USERS} from "../mocks/mock.users";
import {ApiConfigService} from "./apiConfig.service";

@Injectable()
export class UsersService{
  constructor(
              public _http:Http
  ){}


  register(form){
    var params = {
      'email' : form.email,
      'name' : form.name,
      'surnames' : form.surnames,
      'password' : form.password,
      'terms' : 1,
      'type': 0,
    };
    let headers = new Headers({
      'Content-Type': 'application/json',
    });

    return this._http.post(
      ApiConfigService.HOST + "registration",
      params ,
      {
        headers: headers
      });
  }

  getList(profileFilter){
    let filter = this.getProfileFilter(profileFilter);
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/users/list"+filter,
        {headers: headers}
    );
  }

  passwordRecovery(form){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded','X-Requested-With': 'XMLHttpRequest'});
    let email = "email="+form.email;

    return this._http.post(
        ApiConfigService.HOST+"passwordRecovery",
        email ,
        {
          headers: headers
        });
  }

  getProfile(){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)});

    return this._http.get(ApiConfigService.HOST+"user/profile/details",{headers: headers});
  }

  updateProfile(form){
    let params = "email="+form.email+"&name="+form.name+"&surnames="+form.surnames+"&username="+form.username;
    if(form.city_id){
      params += "&city_id="+form.city_id;
    }
    let headers = new Headers({
      'Content-Type':'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });

    return this._http.post(
        ApiConfigService.HOST + "user/profile/update",
        params ,
        {
          headers: headers
        });
  }

  changeProfileImage(img){
    var parameters = {
      'img' : img,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "user/profile/changeImageProfile",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  changePassword(form){
    var parameters = {
      'oldpassword' : form.oldpassword,
      'newpassword' : form.newpassword,
      'newpassword_confirmation' : form.newpassword_confirmation,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "user/profile/changePassword",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  createUser(user){
    var parameters = {
      'username' : user.username,
      'name' : user.name,
      'surnames' : user.surnames,
      'email' : user.email,
      'profiles' : [user.profile_id],
    };
    if(user.city_id != null){
      parameters["city_id"] = user.city_id;
    }

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/users/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  updateUser(user){
    let id = user.id;
    var parameters = {
      'username' : user.username,
      'name' : user.name,
      'surnames' : user.surnames,
      'email' : user.email,
      'profiles' : [user.profile_id],
    };
    if(user.city_id != null){
      parameters["city_id"] = user.city_id;
    }

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/users/update/" + id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  getUserDetails(id){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/users/details/"+id,
        {headers: headers}
    );

  }
  getProfileFilter(profileFilter){
    let filters = "";
    let hasFilter:boolean = false;
    if(profileFilter.youfeelmer){
      hasFilter = true;
      filters = filters + 'customer_profile_id=1';
    }
    if(profileFilter.provider){
      if(hasFilter){
        filters = filters + '&&';
      }else{
        hasFilter = true;
      }
      filters = filters + 'provider_profile_id=1';
    }
    if(profileFilter.adminCinema){
      if(hasFilter){
        filters = filters + '&&';
      }else{
        hasFilter = true;
      }
      filters = filters + 'cinemas_admin_profile_id=1'
    }
    if(profileFilter.programmer){
      if(hasFilter){
        filters = filters + '&&';
      }else{
        hasFilter = true;
      }
      filters = filters + 'cinemas_programmer_profile_id=1';
    }
    if(profileFilter.promoter){
      if(hasFilter){
        filters = filters + '&&';
      }else{
        hasFilter = true;
      }
      filters = filters + 'promoter_profile_id=1';
    }
    if(hasFilter){
      return "?" + filters;
    }
    return filters;
  }
  getListByCinema(cinema_id){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/users/listByCinema/"+cinema_id,
        {headers: headers}
    );
  }
  getListByNoCinema(cinema_id){
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/users/listByNoCinema/"+cinema_id,
        {headers: headers}
    );
  }

  updateByCinema(cinema_id, users){
    let users_id = [];
    for(let i=0; i<users.length; i++){
      users_id.push(users[i].id);
    }
    var parameters = {
      'users' : users_id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/users/updateByCinema/"+cinema_id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }
}
