import {User} from "./user";
export class Customer extends User{

	public customer_id : number;
	// public city_id? : number;
	// public city_name? : string;
	public score : number;
	public birthdate? : Date;
	public postal_code? : string;
	public address? : string;
	public active? : string;


	constructor(
	){
		super();
	}
}