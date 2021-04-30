import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Services } from './../models/services';
import { PageRequest } from './../models/page';
import { Page } from './../models/page';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor (
    private apiService: ApiService
  ) {}

  query(filterData: PageRequest<any>): Observable<Page<Services>> {
    return this.apiService
    .get(
      '/billing/v1/services',
      filterData
    );
  }

  get(userId: string, serviceId: string): Observable<Services>{
    return this.apiService.get('/billing/v1/services/' + serviceId, {userId: userId})
  }

  post(service: Services) :  Observable<Services>{
    return this.apiService.post('/billing/v1/services', service)
  }

  update(service: Services): Observable<Services>{
    return this.apiService.put('/billing/v1/services', service)
  }

}
