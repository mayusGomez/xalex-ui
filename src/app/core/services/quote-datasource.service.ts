import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, Subject, of} from "rxjs";
import {switchMap, startWith, map, share, tap} from 'rxjs/operators'
import {catchError, finalize} from "rxjs/operators";

import {Quote} from "../models/quote";
import {QuotesService} from "./quotes.service";

import {Page, PageRequest} from '../models/page';


@Injectable({
  providedIn: 'root'
})
export class QuoteDatasourceService implements DataSource<Quote> {

  public page = new BehaviorSubject<Page<Quote>>({data:[], paging:{total:0}});
  public loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private quoteService: QuotesService) {}

  loadServices(pageRequest: PageRequest<Quote>) {

      this.loadingSubject.next(true);

      this.quoteService.query(pageRequest).pipe(
              catchError(() => of({data:[], paging:{total:0}})),
              finalize(() => this.loadingSubject.next(false))
          )
          .subscribe( pages => this.page.next(pages));
  }

  connect(collectionViewer: CollectionViewer): Observable<Quote[]> {
      return this.page.pipe(
          map(page => page.data)
      );
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.page.complete();
      this.loadingSubject.complete();
  }
}
