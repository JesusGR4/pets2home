import {Injectable} from "@angular/core";

@Injectable()
export class CodesService{
  public static OK_CODE = 200;
  public static INVALID_TOKEN = 401;
  public static EXPIRED_TOKEN = 402;
  public static INVALID_EMAIL = 403;
  public static SERVER_ERROR_CODE = 500;
  public static FAILED_VALIDATOR_CODE = 501;
  public static NO_PERMISSIONS = 502;
  public static COULD_NOT_CREATE_TOKEN = 550;
  public static BLACKLISTED_TOKEN = 551;
  public static BAD_OPERATION = 503;
  public constructor(
  ){}
  
}
