import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator } from "@angular/material/paginator";

import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";

import { UsersService } from './../../../core/services/users.service';
import { Services } from '../../../core/models/services';
import { ServicesDataSource } from './../../../core/services/services.datasource';
import { ServicesService } from './../../../core/services/services.service';

import { PageRequest } from '../../../core/models/page';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.sass']
})
export class CustomerTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['description', 'price', 'cost'];
  dataSource: ServicesDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public userServ: UsersService,
    public servService: ServicesService
  ) { }

  ngOnInit(): void {

    this.dataSource = new ServicesDataSource(this.servService);
    let genFilter : PageRequest<any> = {
      userId: this.userServ.currentAccount,
      pageNumber: 0,
      pageSize: 2
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

  getRecord(row: any){
    console.log("Row:", row);
  }

  openAddDialog() {
    console.log("open");
  }

  startEdit(service:Services) {
    console.log("startEdit:", service);
  }

  deleteItem(service:Services) {
    console.log("deleteItem:", service);
  }



}
