export interface Location {
    country: string
    city: string
    address: string
}

export interface Professional {
    code?: number;
    name?: string;
}

export interface User {
    id: string
    name : string
    last_name?: string
    mob_phone?: string
    email: string
    segment?: string
    id_type?: string
    id_code?: string
    location?:Location
    professionals?: Professional[]
}