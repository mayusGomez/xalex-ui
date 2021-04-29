import { Observable } from 'rxjs';

export interface Sort<T> {
    property: keyof T;
    order: 'asc' | 'desc';
}

export interface Page<T> {
    data: T[];
    paging: {
        total: number
    }
}

export interface PageRequest<T> {
    userId?: string
    filterField?: string
    filterData?: string
    pageNumber?: number
    pageSize?: number
    sort?: Sort<T>;
}

export type PaginatedEndpoint<T, Q> = (query: Q) => Observable<Page<T>>