import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError ,  map } from 'rxjs/operators';

import { UsersService } from './../../core/services/users.service';
import { Quote } from './../../core/models/quote';
import { QuotesService } from '../../core/services/quotes.service';

@Injectable()
export class QuoteServiceResolver implements Resolve<Quote> {
  constructor(
    private quoteService: QuotesService,
    private router: Router,
    private userService: UsersService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.quoteService.get( this.userService.currentAccount, route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
       
  }
}
