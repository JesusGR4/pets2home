import {User} from "./user";
export class Event{
	public id: number;
	public status: number;
	public published: number;
	public date: any;
	public limit_crowdfunding: any;
	public limit_orders: any;
	public hour?: string;
	public remaining_days: number;
	public description? : string;
	public private? : boolean;
	public user? : User;
	public net_price?: number;
	public vat_price?: number;
	public needs?: string;
	public q_and_a?: boolean;
	public launch_event?: boolean;
	public additional_events?: string;
	public crowdfunding_target: number;
	public crowdfunding_qty: number;
	public tickets_target: number;
	public tickets_qty: number;
	public movie_id?: number;
	public movie_title: string;
	public movie_description?: string;
	public movie_img?: string;
	public trailer_url?: string;
	public movie_frames?: string[];
	public movie_tags?: string[];
	public cinema_id?: number;
	public cinema_name: string;
	public cinema_latitude?: number;
	public cinema_longitude?: number;
	public cinema_address?: string;
	public city_id?: number;
	public city_name: string;
	public language_id?: number;
	public language?: string;
	public promoter_name?: string;
	public promoter_surnames?: string;
	public accepted_by_programmer?: number;


	constructor(

	){}
}
