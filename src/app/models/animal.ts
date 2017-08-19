export class Animal{
  public id: number;
  public name: string;
  public gender: string;
  public breed: string;
  public age: number;
  public medicalHistory: string;
  public type: any;
  public size: string;
  public shelter_id: number;
  public mainPicture: string;
  public images: string;

  constructor(){
    this.id=0;
    this.name="";
    this.gender="";
    this.breed="";
    this.age=0;
    this.medicalHistory="";
    this.size="";
    this.shelter_id = 0;
    this.images ="";
    this.type ="";
    this.mainPicture ="";
  }
}
