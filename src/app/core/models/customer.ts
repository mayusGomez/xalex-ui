export interface Notes {
	created_at:string;
	description:string;
	detail:string;
}

export interface Date  {
	date:string;
	day:number;
	month:number;
	year:number;
}

export interface AuxMobilePhone  {
    number: string;
    label: string;
    source: string;
}

export interface Location {
	country:string;
	city:string;
	address:string;
}

export interface Customer {
    id: string;
	id_user: string;
	name: string;
	last_name: string;
	main_mobile_phone: string;
    aux_mobile_phone: AuxMobilePhone[];
    email: string;
    id_type: string;
    id_number: string;
    segment: string;
    location: Location;
    birth_date: Date;
    notes: Notes;
}

