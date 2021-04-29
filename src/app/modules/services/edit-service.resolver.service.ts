import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError ,  map } from 'rxjs/operators';

import { UsersService } from './../../core/services/users.service';
import { Services } from './../../core/models/services';
import { ServicesService } from '../../core/services/services.service';

@Injectable()
export class EditableServiResolver implements Resolve<Services> {
  constructor(
    private servService: ServicesService,
    private router: Router,
    private userService: UsersService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.servService.get( this.userService.currentAccount, route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
       
  }
}
