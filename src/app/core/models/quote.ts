import { Professional } from './user';

export enum QuoteStatus {
    CanceledQuote = 1,
	StartedQuote ,
	FinalizedQuote,
	PendingQuote ,
	DiscartedQuote 
}

export interface Notes{
    created_at?:string;
    user_name?:string;
    detail:string;
}

export interface DetailService  {
	description:string;
	price: number;
	cost?:number;
}

export interface EventCustomer  {
	id:string;
	name:string;
	last_name?:string;
	main_mobile_phone?:string;
	email?:string;
	id_type?:string
	id_number?:string;
}


export interface Quote {
    id?: string;
    code?: string;
    register_date?: string;
    id_user?:string;
    customer?: EventCustomer;
    professional?:Professional;
    status?:QuoteStatus;
    description?: string;
    notes?:Notes[];
    services?:DetailService[];
}
