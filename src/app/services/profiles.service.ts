import {Injectable} from "@angular/core";

@Injectable()
export class ProfilesService{
  public static CUSTOMER_PROFILE_ID = 1;
  public static PROVIDER_PROFILE_ID = 2;
  public static CINEMAS_ADMIN_PROFILE_ID = 3;
  public static CINEMAS_PROGRAMMER_PROFILE_ID = 4;
  public static PROMOTER_PROFILE_ID = 5;
  public static ADMIN_PROFILE_ID = 100;

  public static CUSTOMER_STRING = 'customer';
  public static PROVIDER_STRING = 'provider';
  public static CINEMAS_ADMIN_STRING = 'cinemasAdmin';
  public static CINEMAS_PROGRAMMER_STRING = 'programmer';
  public static PROMOTER_STRING = 'promoter';
  public static ADMIN_STRING = 'admin';

  constructor(
  ){}

  getProfileById(id){
    if(id == ProfilesService.CUSTOMER_PROFILE_ID){
      return ProfilesService.CUSTOMER_STRING;
    }
    if(id == ProfilesService.PROVIDER_PROFILE_ID){
      return ProfilesService.PROVIDER_STRING;
    }
    if(id == ProfilesService.CINEMAS_ADMIN_PROFILE_ID){
      return ProfilesService.CINEMAS_ADMIN_STRING
    }
    if(id == ProfilesService.CINEMAS_PROGRAMMER_PROFILE_ID){
      return ProfilesService.CINEMAS_PROGRAMMER_STRING;

    }
    if(id == ProfilesService.PROMOTER_PROFILE_ID){
      return ProfilesService.PROMOTER_STRING;
    }
  }
  
}
