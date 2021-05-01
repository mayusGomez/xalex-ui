import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError ,  map } from 'rxjs/operators';

import { UsersService } from './../../core/services/users.service';
import { Customer } from './../../core/models/customer';
import { CustomersService } from '../../core/services/customers.service';

@Injectable()
export class CustomerResolver implements Resolve<Customer> {
  constructor(
    private customerService: CustomersService,
    private router: Router,
    private userService: UsersService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.customerService.get( this.userService.currentAccount, route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
       
  }
}
