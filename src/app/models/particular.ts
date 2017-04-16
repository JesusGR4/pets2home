export class Particular{
  public id: number;
  public name: string;
  public surname: string;
  public phone: string;
  public image_url: string;
  public province: string;
  public city: string;
  public email: string;
  public password: string;
  public confirm_password: string;


  constructor(){
    this.id=0;
    this.name="";
    this.surname="";
    this.phone="";
    this.image_url="";
    this.province="";
    this.city="";
    this.email="";
    this.password="";
    this.confirm_password="";
  }
}
