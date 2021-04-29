import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServicesService } from '../../../core/services/services.service';
import { UsersService } from '../../../core/services/users.service';

import { PageRequest } from '../../../core/models/page';

@Injectable()
export class ServicesResolver implements Resolve<any> {
  constructor(
    private servicesService: ServicesService,
    private userService: UsersService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    let genFilter : PageRequest<any> = {
      userId: this.userService.currentAccount,
      pageNumber: 1,
      pageSize: 10
    }

    return this.servicesService.query(genFilter)
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
