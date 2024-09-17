export interface TripTemplate {
	id? : string;
	title? : string;
	userEmailAddress? : string;
	description? : string;
	cost? : number; // in euros
	duration? : number; // in days
	destinations? : string[];
	destinationsLowercase? : string[];
	pictures? : string[];
	favorites? : string[];
	promote? : boolean;
}