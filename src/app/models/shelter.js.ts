export class Shelter{
  public shelter_id;
  public user_id;
  public name;
  public phone;
  public email;
  public province;
  public city;
  public password;
  public longitude;
  public latitude;
  public address;
  public description;
  public schedule;
  public end_date;
  public numberOfPets;
  public img_url;
  constructor() {
    this.shelter_id=0;
    this.user_id=0;
    this.name="";
    this.phone="";
    this.email="";
    this.province="";
    this.city="";
    this.password="";
    this.longitude="";
    this.latitude="";
    this.address="";
    this.description="";
    this.schedule="";
    this.end_date="";
    this.numberOfPets=0;
    this.img_url="";
  }

}
