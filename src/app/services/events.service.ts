import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {ProfilesService} from "./profiles.service";
import {Event} from "../models/event";

@Injectable()
export class EventsService {

  public static PENDING_ID = 1;
  public static VALIDATED_ID = 2;
  public static CAMPAIGN_ID = 3;
  public static CONFIRMED_ID = 4;
  public static CLOSED_ID = 5;
  public static COMPLETED_ID = 6;
  public static CANCELED_ID = 7;
  public static REJECTED_ID = 8;

  public static PENDING_STRING = 'Pendiente';
  public static VALIDATED_STRING = 'Validado';
  public static IN_CAMAIGN_STRING = 'En campaña';
  public static CONFIRMED_STRING = 'Confirmado';
  public static CLOSED_STRING = 'Cerrado';
  public static COMPLETED_STRING = 'Completado';
  public static REJECTED_STRING = 'Rechazado';



  constructor(public _http:Http) {
  }
  // Profile id null para admin
  getActiveList(filters = null, profile_id = null) {
    let filter = "";
    if (filters != null) {
      if(filters.cinema_id && filters.cinema_id.length > 0){
        filter += "&cinema_id=" + filters.cinema_id +"";
      }
      if(filters.movie_id && filters.movie_id.length > 0){
        filter += "&movie_id=" + filters.movie_id +"";
      }
      if(filters.city_id && filters.city_id.length > 0){
        filter += "&city_id=" + filters.city_id +"";
      }
      if(filters.start_date && filters.start_date.length > 0){
        filter += "&start_date=" + filters.start_date +"";
      }
      if(filters.end_date && filters.end_date.length > 0){
        filter += "&end_date=" + filters.end_date +"";
      }
    }
    let profileUrl = "";
    if(profile_id == null){
      profileUrl = "admin/events/list?status=[3,4,5]";
    }else if(profile_id == ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
      profileUrl = "user/cinemasAdmin/events/listInMyCinemas?status=[3,4,5]";
    }else if(profile_id == ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
      profileUrl = "user/programmer/events/listInMyCinemas?status=[3,4,5]";
    }else if(profile_id == ProfilesService.PROVIDER_PROFILE_ID){
      profileUrl = "user/provider/events/listOfMyMovies?status=[3,4,5]";
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + profileUrl + filter,
        {headers: headers}
    );

  }

  getCompletedList(filters = null, profile_id = null) {
    let filter = "";
    if (filters != null) {
      if(filters.cinema_id && filters.cinema_id.length > 0){
        filter += "&cinema_id=" + filters.cinema_id +"";
      }
      if(filters.movie_id && filters.movie_id.length > 0){
        filter += "&movie_id=" + filters.movie_id +"";
      }
      if(filters.city_id && filters.city_id.length > 0){
        filter += "&city_id=" + filters.city_id +"";
      }
      if(filters.start_date && filters.start_date.length > 0){
        filter += "&start_date=" + filters.start_date +"";
      }
      if(filters.end_date && filters.end_date.length > 0){
        filter += "&end_date=" + filters.end_date +"";
      }
    }
    let profileUrl = "";
    if(profile_id == null){
      profileUrl = "admin/events/list?status=[6]";
    }else if(profile_id == ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
      profileUrl = "user/cinemasAdmin/events/listInMyCinemas?status=[6]";
    }else if(profile_id == ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
      profileUrl = "user/programmer/events/listInMyCinemas?status=[6]";
    }else if(profile_id == ProfilesService.PROVIDER_PROFILE_ID){
      profileUrl = "user/provider/events/listOfMyMovies?status=[6]";
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + profileUrl + filter,
        {headers: headers}
    );

  }

  getPendingList(filters = null) {
    let filter = "";
    if (filters != null) {
      if(filters.cinema_id && filters.cinema_id.length > 0){
        filter += "&cinema_id=" + filters.cinema_id +"";
      }
      if(filters.movie_id && filters.movie_id.length > 0){
        filter += "&movie_id=" + filters.movie_id +"";
      }
      if(filters.city_id && filters.city_id.length > 0){
        filter += "&city_id=" + filters.city_id +"";
      }
      if(filters.start_date && filters.start_date.length > 0){
        filter += "&start_date=" + filters.start_date +"";
      }
      if(filters.end_date && filters.end_date.length > 0){
        filter += "&end_date=" + filters.end_date +"";
      }
    }

    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/events/list?status=[1]" + filter,
        {headers: headers}
    );

  }

  getValidatedList(filters = null, profile_id = null) {
    let filter = "";
    if (filters != null) {
      if(filters.cinema_id && filters.cinema_id.length > 0){
        filter += "&cinema_id=" + filters.cinema_id +"";
      }
      if(filters.movie_id && filters.movie_id.length > 0){
        filter += "&movie_id=" + filters.movie_id +"";
      }
      if(filters.city_id && filters.city_id.length > 0){
        filter += "&city_id=" + filters.city_id +"";
      }
      if(filters.start_date && filters.start_date.length > 0){
        filter += "&start_date=" + filters.start_date +"";
      }
      if(filters.end_date && filters.end_date.length > 0){
        filter += "&end_date=" + filters.end_date +"";
      }
    }
    let url = "";
    if(profile_id == null){
      url = "admin/events/list?status=[2]";
    }else if(profile_id == ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
      url = "user/programmer/events/listInMyCinemas?status=[2]";
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + url + filter,
        {headers: headers}
    );

  }

  getCanceledList(filters = null, profile_id = null) {
    let filter = "";
    if (filters != null) {
      if(filters.cinema_id && filters.cinema_id.length > 0){
        filter += "&cinema_id=" + filters.cinema_id +"";
      }
      if(filters.movie_id && filters.movie_id.length > 0){
        filter += "&movie_id=" + filters.movie_id +"";
      }
      if(filters.city_id && filters.city_id.length > 0){
        filter += "&city_id=" + filters.city_id +"";
      }
      if(filters.start_date && filters.start_date.length > 0){
        filter += "&start_date=" + filters.start_date +"";
      }
      if(filters.end_date && filters.end_date.length > 0){
        filter += "&end_date=" + filters.end_date +"";
      }
    }
    let profileUrl = "";
    if(profile_id == null){
      profileUrl = "admin/events/list?status=[7]";
    }else if(profile_id == ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
      profileUrl = "user/cinemasAdmin/events/listInMyCinemas?status=[7]";
    }else if(profile_id == ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
      profileUrl = "user/programmer/events/listInMyCinemas?status=[7]";
    }else if(profile_id == ProfilesService.PROVIDER_PROFILE_ID){
      profileUrl = "user/provider/events/listOfMyMovies?status=[7]";
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + profileUrl + filter,
        {headers: headers}
    );

  }

  getUserPromotedList() {

    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "user/events/myPromotedList",
        {headers: headers}
    );

  }

  publishEvent(event: Event) : any{
    var parameters = {
      'event_id' : event.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/events/publish",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  unpublishEvent(event: Event) : any{
    var parameters = {
      'event_id' : event.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/events/unpublish",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteEvent(event: Event) : any{
    var parameters = {
      'event_id' : event.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/events/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  validateEvent(event: Event) : any{
    var parameters = {
      'event_id' : event.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/events/validate",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  acceptEventByProgrammer(event: Event) : any{
    var parameters = {
      'event_id' : event.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "user/programmer/events/accept",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  setInCampaignEvent(event: Event) : any{
    var parameters = {
      'event_id' : event.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/events/setCampaign",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  rejectEvent(event: Event) : any{
    var parameters = {
      'event_id' : event.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/events/reject",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  createEvent(event: Event, user_id = null) : any {
    var parameters = {
      'movie_id' : event.movie_id,
      'language_id' : event.language_id,
      'cinema_id' : event.cinema_id,
      'date' : event.date.formatted,
      'private' : event.private,
      'description' : event.description,
      'needs' : event.needs,
      'q&a' : event.q_and_a,
      'launch_event' : event.launch_event,
      'hour' : event.hour
    };
    let headers = null;
    if(user_id == null){
      parameters['name'] = event.user.name;
      parameters['surnames'] = event.user.surnames;
      parameters['phone'] = event.user.phone;
      parameters['email'] = event.user.email;
      headers = new Headers({
        'Content-Type': 'application/json',
      });
    }else{
      parameters['user_id'] = user_id;
      headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
      });
    }
    return this._http.post(ApiConfigService.HOST + "events/create",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  getDetails(movie_id: number, onlyIds : number): any{
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this._http.get(
      ApiConfigService.HOST + "events/details/"+movie_id+"/"+onlyIds,
      {headers: headers}
    );
  }

  getCatalog(currentPage, eventFilter){
    let filter = "?";
    if(eventFilter != null){
      if(eventFilter.countries_id && eventFilter.countries_id.length > 0){
        filter += "&countries_id=[" + eventFilter.countries_id + "]";
      }
      if(eventFilter.genres_id && eventFilter.genres_id.length > 0){
        filter += "&genres_id=[" + eventFilter.genres_id + "]";
      }
      if(eventFilter.languages_id && eventFilter.languages_id.length > 0){
        filter += "&languages_id=[" + eventFilter.languages_id + "]";
      }
      if(eventFilter.tags_id && eventFilter.tags_id.length > 0){
        filter += "&tags_id=[" + eventFilter.tags_id + "]";
      }
      if(eventFilter.qualifications_id && eventFilter.qualifications_id.length > 0){
        filter += "&qualifications_id=[" + eventFilter.qualifications_id + "]";
      }
      if(eventFilter.director_id && eventFilter.director_id.length > 0){
        filter += "&director_id=" + eventFilter.director_id + "";
      }
      if(eventFilter.actor_id && eventFilter.actor_id.length > 0){
        filter += "&actor_id=" + eventFilter.actor_id + "";
      }
      if(eventFilter.city_id && eventFilter.city_id.length > 0){
        filter += "&city_id=" + eventFilter.city_id + "";
      }
      if(eventFilter.geo && eventFilter.geo.length > 0){
        filter += "&geo=" + eventFilter.geo + "";
      }
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "events/list/"+currentPage+filter,
        {headers: headers}
    );
  }

  getStatusById(id){
    if(id == EventsService.CAMPAIGN_ID){
      return EventsService.IN_CAMAIGN_STRING;
    }
    if(id == EventsService.CONFIRMED_ID){
      return EventsService.CONFIRMED_STRING;
    }
    if(id == EventsService.CLOSED_ID){
      return EventsService.CLOSED_STRING;
    }
  }

    calculate(movie_id : number, cinema_id : number){
        let headers = new Headers({
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
        });
        return this._http.get(
            ApiConfigService.HOST + "events/calculate/"+movie_id+"/"+cinema_id,
            {headers: headers}
        );
    }
}
