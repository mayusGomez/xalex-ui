
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, Subject, of} from "rxjs";
import { switchMap, startWith, map, share, tap } from 'rxjs/operators'
import {Customer} from "../models/customer";
import {CustomersService} from "./customers.service";
import {catchError, finalize} from "rxjs/operators";

import { Page, PageRequest } from '../models/page';


export class CustomersDataSource implements DataSource<Customer> {

    public page = new BehaviorSubject<Page<Customer>>({data:[], paging:{total:0}});
    public loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private customerService: CustomersService) {}

    loadCustomers(pageRequest: PageRequest<Customer>) {

        this.loadingSubject.next(true);

        this.customerService.query(pageRequest).pipe(
                catchError(() => of({data:[], paging:{total:0}})),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe( pages => this.page.next(pages));
    }

    connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
        console.log("Connecting data source");
        return this.page.pipe(
            map(page => page.data)
        );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.page.complete();
        this.loadingSubject.complete();
    }

}

