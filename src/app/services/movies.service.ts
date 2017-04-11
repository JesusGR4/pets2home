import {Injectable} from "@angular/core";
import { Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ApiConfigService} from "./apiConfig.service";
import {Cinema} from "../models/cinema";
import {Movie} from "../models/movie";
import {ProfilesService} from "./profiles.service";
@Injectable()
export class MoviesService{
  constructor(
              public _http:Http
  ){}

  getList(currentPage, movieFilter = null, profile_id = null){
    let filter = "";
    if(movieFilter != null){
      filter = "?name="+movieFilter;
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });
    let url = "";
    if(profile_id == null ){
      url = "movies/list/";
    }else if(profile_id == ProfilesService.PROVIDER_PROFILE_ID){
      url = "user/provider/movies/list/";
      headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
      });
    }else if(profile_id == ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
      url = "user/programmer/movies/list/";
      headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
      });
    }
    return this._http.get(
        ApiConfigService.HOST + url +currentPage+filter,
        {headers: headers}
    );
  }

  getMoviesByProvider(){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "user/provider/movies/getMyMovies",
        {headers: headers}
    );
  }

  getMoviesFromTheMovieDB(name){
    if(name != "" && name != undefined) {

      var parameters = {
        'name' : name
      };

      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
      });

      return this._http.post(ApiConfigService.HOST + "admin/moviedb/getListByName",
          JSON.stringify(parameters),
          {headers: headers}
      )
    }
  }

  getMovieFromTheMovieDB(id){
    if(id != "" && id != undefined) {


      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
      });

      return this._http.get(
          ApiConfigService.HOST + "admin/moviedb/getDetailsById/"+id,
          {headers: headers}
      );
    }
  }

  getCatalog(currentPage, movieFilter){
    let filter = "?";
    if(movieFilter != null){
      if(movieFilter.countries_id && movieFilter.countries_id.length > 0){
        filter += "&countries_id=[" + movieFilter.countries_id + "]";
      }
      if(movieFilter.genres_id && movieFilter.genres_id.length > 0){
        filter += "&genres_id=[" + movieFilter.genres_id + "]";
      }
      if(movieFilter.languages_id && movieFilter.languages_id.length > 0){
        filter += "&languages_id=[" + movieFilter.languages_id + "]";
      }
      if(movieFilter.tags_id && movieFilter.tags_id.length > 0){
        filter += "&tags_id=[" + movieFilter.tags_id + "]";
      }
      if(movieFilter.qualifications_id && movieFilter.qualifications_id.length > 0){
        filter += "&qualifications_id=[" + movieFilter.qualifications_id + "]";
      }
      if(movieFilter.director_id && movieFilter.director_id.length > 0){
        filter += "&director_id=" + movieFilter.director_id + "";
      }
      if(movieFilter.actor_id && movieFilter.actor_id.length > 0){
        filter += "&actor_id=" + movieFilter.actor_id + "";
      }
    }
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this._http.get(
        ApiConfigService.HOST + "movies/list/"+currentPage+"?"+filter,
        {headers: headers}
    );
  }
  getDetails(movie_id: number, onlyIds : number): any{
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this._http.get(
        ApiConfigService.HOST + "movies/details/"+movie_id+"/"+onlyIds,
        {headers: headers}
    );
  }
  createMovie(movie: Movie, user_id = null, profile_id = null) : any {
    let user = "";
    let url = "";
    if(user_id == null){
      user = movie.user_id;
      url = "admin/movies/create";
    }else{
      user = user_id;
      if(profile_id == ProfilesService.PROVIDER_PROFILE_ID){
        url = "user/provider/movies/create";
      }else if(profile_id == ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
        url = "user/programmer/movies/create";
      }
    }
    var parameters = {
      'title' : movie.title,
      'year' : movie.year,
      'description' : movie.description,
      'user_id' : user,
      'qualification_id' : movie.qualification_id,
      'img_url' : movie.img_url,
      'web' : movie.web,
      'fb_url' : movie.fb_url,
      'tw_url' : movie.tw_url,
      'trailer_url' : movie.trailer_url,
      'duration' : movie.duration,
      'countries' : movie.countries,
      'genres' : movie.genres,
      'directors' : movie.directors,
      'actors' : movie.actors,
      'frames' : movie.frames,
      'formats' : movie.formats,
      'original_languages' : movie.original_languages,
      'languages' : movie.languages,
      'tags' : movie.tags

    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });

    return this._http.post(ApiConfigService.HOST + url,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  updateMovie(movie: Movie) : any{
    var parameters = {
      'title' : movie.title,
      'year' : movie.year,
      'description' : movie.description,
      'user_id' : movie.user_id,
      'qualification_id' : movie.qualification_id,
      'img_url' : movie.img_url,
      'web' : movie.web,
      'fb_url' : movie.fb_url,
      'tw_url' : movie.tw_url,
      'trailer_url' : movie.trailer_url,
      'duration' : movie.duration,
      'countries' : movie.countries,
      'genres' : movie.genres,
      'directors' : movie.directors,
      'actors' : movie.actors,
      'frames' : movie.frames,
      'formats' : movie.formats,
      'original_languages' : movie.original_languages,
      'languages' : movie.languages,
      'tags' : movie.tags
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/movies/update/"+movie.id,
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  deleteMovie(movie: Movie) : any{
    var parameters = {
      'movie_id' : movie.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/movies/delete",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  publishMovie(movie: Movie) : any{
    var parameters = {
      'movie_id' : movie.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/movies/publish",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  unpublishMovie(movie: Movie) : any{
    var parameters = {
      'movie_id' : movie.id,
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.post(ApiConfigService.HOST + "admin/movies/unpublish",
        JSON.stringify(parameters),
        {headers: headers}
    )
  }

  featureMovie(movie: Movie) : any{

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem(ApiConfigService.TOKEN_FIELD)
    });
    return this._http.get(
        ApiConfigService.HOST + "admin/movies/featured/"+movie.id,
        {headers: headers}
    );
  }

  checkFormats(movie_id : number, cinema_id : number) : any{
      let headers = new Headers({
        'X-Requested-With': 'XMLHttpRequest',
      });
      return this._http.get(
          ApiConfigService.HOST + "movies/checkFormats/"+movie_id+"/"+cinema_id,
          {headers: headers}
      );
  }
  copyMovie(movie : Movie) : Movie{
    let m = new Movie;
    m.id = movie.id;
    m.title = movie.title;
    if(movie.year != null){
      m.year = movie.year;
    }
    if(movie.description != null){
      m.description = movie.description;
    }
    if(movie.user_id != null){
      m.user_id = movie.user_id.toString();
    }
    if(movie.qualification_id != null){
      m.qualification_id = movie.qualification_id;
    }
    if(movie.img_url != null){
      m.img_url = movie.img_url;
    }
    if(movie.web != null){
      m.web = movie.web;
    }
    if(movie.fb_url != null){
      m.fb_url = movie.fb_url;
    }
    if(movie.tw_url != null){
      m.tw_url = movie.tw_url;
    }
    if(movie.trailer_url != null){
      m.trailer_url = movie.trailer_url;
    }
    if(movie.duration != null){
      m.duration = movie.duration;
    }
    if(movie.countries != null && movie.countries.length > 0){
      m.countries = movie.countries.map(String);
    }
    if(movie.genres != null && movie.genres.length > 0){
      m.genres = movie.genres.map(String);
    }
    if(movie.directors != null && movie.directors.length > 0){
      m.directors = movie.directors.map(String);
    }
    if(movie.actors != null && movie.actors.length > 0){
      m.actors = movie.actors.map(String);
    }
    if(movie.frames != null && movie.frames.length > 0){
      m.frames = movie.frames;
    }
    if(movie.frames_url != null && movie.frames_url.length > 0){
      m.frames_url = movie.frames_url;
    }
    if(movie.formats != null && movie.formats.length > 0){
      m.formats = movie.formats.map(String);
    }
    if(movie.original_languages != null && movie.original_languages.length > 0){
      m.original_languages = movie.original_languages.map(String);
    }
    if(movie.languages != null && movie.languages.length > 0){
      m.languages = movie.languages.map(String);
    }
    if(movie.tags != null && movie.tags.length > 0){
      m.tags = movie.tags.map(String);
    }
    return m;
  }

  setMovie(m, movie){
    m.id = movie.id;
    m.title = movie.title;
    if(movie.year != null){
      m.year = movie.year;
    }
    if(movie.description != null){
      m.description = movie.description;
    }
    if(movie.user_id != null){
      m.user_id = movie.user_id.toString();
    }
    if(movie.qualification_id != null){
      m.qualification_id = movie.qualification_id;
    }
    if(movie.img_url != null){
      m.img_url = movie.img_url;
    }
    if(movie.web != null){
      m.web = movie.web;
    }
    if(movie.fb_url != null){
      m.fb_url = movie.fb_url;
    }
    if(movie.tw_url != null){
      m.tw_url = movie.tw_url;
    }
    if(movie.trailer_url != null){
      m.trailer_url = movie.trailer_url;
    }
    if(movie.duration != null){
      m.duration = movie.duration;
    }
    if(movie.countries != null && movie.countries.length > 0){
      m.countries = movie.countries.map(String);
    }
    if(movie.genres != null && movie.genres.length > 0){
      m.genres = movie.genres.map(String);
    }
    if(movie.directors != null && movie.directors.length > 0){
      m.directors = movie.directors.map(String);
    }
    if(movie.actors != null && movie.actors.length > 0){
      m.actors = movie.actors.map(String);
    }
    if(movie.frames != null && movie.frames.length > 0){
      m.frames = movie.frames;
    }
    if(movie.formats != null && movie.formats.length > 0){
      m.formats = movie.formats.map(String);
    }
    if(movie.original_languages != null && movie.original_languages.length > 0){
      m.original_languages = movie.original_languages.map(String);
    }
    if(movie.languages != null && movie.languages.length > 0){
      m.languages = movie.languages.map(String);
    }
    if(movie.tags != null && movie.tags.length > 0){
      m.tags = movie.tags.map(String);
    }
    return m;
  }
}
