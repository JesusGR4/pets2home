import {Injectable} from "@angular/core";

@Injectable()
export class MessagesService{
    public static OK_CODE_MESSAGE = "200";
    public static INVALID_TOKEN_MESSAGE = "Sus credenciales no son correctas";
    public static INVALID_EMAIL_MESSAGE = "El email introducido no existe";
    public static EXPIRED_TOKEN_MESSAGE = "402";
    public static SERVER_ERROR_CODE_MESSAGE = "Se ha producido un error en el servidor. Puede ponerse en contacto con Youfeelm@gmail.com para solucionar el problema";
    public static FAILED_VALIDATOR_CODE_MESSAGE = "422";
    public static NO_PERMISSIONS_MESSAGE = "502";
    public static COULD_NOT_CREATE_TOKEN_MESSAGE = "550";
    public static BLACKLISTED_TOKEN_MESSAGE = "551";


    public static ADMIN_PROFILE_TEXT = "Administrador";
    public static CUSTOMER_PROFILE_TEXT = "Youfeelmer";
    public static PROVIDER_PROFILE_TEXT = "Proveedor de contenido";
    public static CINEMA_ADMIN_PROFILE_TEXT = "Encargado de sala";
    public static CINEMA_PROGRAMMER_PROFILE_TEXT = "Programador de sala";

    constructor(
  ){}

  showErrorMessage(message){
      alert(message);
  }
  showSuccessMessage(message){
      alert(message);
  }
  showServerErrorMessage(message){
      if(message.status == MessagesService.FAILED_VALIDATOR_CODE_MESSAGE){
          let messages = "";
          let json = JSON.parse(message._body);
          for(let i=0; i<json.message.length; i++){
              messages = messages + json.message[i] + " ";
          }
          this.showErrorMessage(messages);
      }else{
          this.showErrorMessage(MessagesService.SERVER_ERROR_CODE_MESSAGE);
      }

  }
}
