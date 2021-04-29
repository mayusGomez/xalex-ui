
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, Subject, of} from "rxjs";
import { switchMap, startWith, map, share, tap } from 'rxjs/operators'
import {Services} from "../models/services";
import {ServicesService} from "./services.service";
import {catchError, finalize} from "rxjs/operators";

import { Page, PageRequest } from '../models/page';


export class ServicesDataSource implements DataSource<Services> {

    public page = new BehaviorSubject<Page<Services>>({data:[], paging:{total:0}});
    public loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private servicesService: ServicesService) {}

    loadServices(pageRequest: PageRequest<Services>) {

        this.loadingSubject.next(true);

        this.servicesService.query(pageRequest).pipe(
                catchError(() => of({data:[], paging:{total:0}})),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe( pages => this.page.next(pages));
    }

    connect(collectionViewer: CollectionViewer): Observable<Services[]> {
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

