import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Quote, Notes } from './../models/quote';
import { PageRequest } from './../models/page';
import { Page } from './../models/page';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private apiService: ApiService) { }

  query(filterData: PageRequest<any>): Observable<Page<Quote>> {
    return this.apiService
    .get(
      '/billing/v1/quotes',
      filterData
    );
  }

  get(userId: string, quoteId: string): Observable<Quote>{
    return this.apiService.get('/billing/v1/quotes/' + quoteId, {userId: userId})
  }

  post(quote: Quote) :  Observable<Quote>{
    return this.apiService.post('/billing/v1/quotes', quote)
  }

  update(quote: Quote): Observable<Quote>{
    return this.apiService.put('/billing/v1/quotes', quote)
  }

  addNote(userId:string, quoteId: string, note: Notes) :  Observable<Quote>{
    return this.apiService.post(`/billing/v1/quotes/${quoteId}/notes?${userId}`, note)
  }

}

