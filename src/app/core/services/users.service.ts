import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentAccount: string;

  constructor(private httpClient: HttpClient) {
    this.currentAccount = "";
  }

  getUser(user_id : string): Observable<User>  {
    let params = new HttpParams().set('user', user_id);
    return this.httpClient.get<User>(`${environment.gateway}/prod/users`, { params: params })
      .pipe(
        catchError(this.handleError<User>(`getUser = ${user_id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}


