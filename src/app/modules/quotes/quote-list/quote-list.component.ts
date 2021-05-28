import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator } from "@angular/material/paginator";

import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from "rxjs";

import { UsersService } from './../../../core/services/users.service';
import { Quote } from '../../../core/models/quote';
import { QuoteDatasourceService } from './../../../core/services/quote-datasource.service';
import { QuotesService } from './../../../core/services/quotes.service';
import { PageRequest } from '../../../core/models/page';


@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.sass']
})
export class QuoteListComponent implements OnInit {

  displayedColumns: string[] = ['action', 'code','register_date', 'description'];
  dataSource: QuoteDatasourceService;
  pageSize:number= 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public userServ: UsersService,
    public quoteService: QuotesService
  ) { }

  ngOnInit(): void {

    this.dataSource = new QuoteDatasourceService(this.quoteService);
    let genFilter : PageRequest<any> = {
      userId: this.userServ.currentAccount,
      pageNumber: 0,
      pageSize: this.pageSize
    }
    this.dataSource.loadServices(genFilter);

  }

  ngAfterViewInit() {

    fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            debounceTime(700),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadServicesPage();
            })
        )
        .subscribe();

    this.paginator.page
    .pipe(
        tap(() => this.loadServicesPage())
    )
    .subscribe();

  }

  loadServicesPage() {
      let genFilter : PageRequest<any> = {
        userId: this.userServ.currentAccount,
        filterField: this.input.nativeElement.value? "description": undefined,
        filterData: this.input.nativeElement.value,
        pageNumber: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      }

      this.dataSource.loadServices(genFilter);
  }

  addQuote() {
    this.router.navigate(['/quotes/add', ]);
  }

  editQuote(quote:Quote) {
    console.log("startEdit:", quote);
    //this.router.navigate(['/services/edit/' + service.id, ]);
  }

}
