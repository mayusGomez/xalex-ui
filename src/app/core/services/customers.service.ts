import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Customer } from '../models/customer';
import { ApiService } from './api.service';
import { PageRequest } from './../models/page';
import { Page } from './../models/page'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private apiService: ApiService) { }

  query(filterData: PageRequest<any>): Observable<Page<Customer>> {
    return this.apiService
    .get(
      '/v1/customers',
      filterData
    );
  }

  get(userId: string, customerId: string): Observable<Customer>{
    return this.apiService.get('/v1/customers/' + customerId, {userId: userId})
  }

  post(customer: Customer) :  Observable<Customer>{
    return this.apiService.post('/v1/customers', customer)
  }

  update(customer: Customer): Observable<Customer>{
    return this.apiService.put('/v1/customers', customer)
  }

}
