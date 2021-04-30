import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator } from "@angular/material/paginator";

import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from "rxjs";

import { UsersService } from './../../../core/services/users.service';
import { Customer } from '../../../core/models/customer';
import { CustomersDataSource } from './../../../core/services/customers.datasource';
import { CustomersService } from './../../../core/services/customers.service';
import { PageRequest } from '../../../core/models/page';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.sass']
})
export class CustomersListComponent implements OnInit {

  displayedColumns: string[] = ['name','last_name', 'main_mobile_phone', 'id_number'];
  dataSource: CustomersDataSource;
  pageSize:number= 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public userServ: UsersService,
    public customerService: CustomersService
  ) { }

  ngOnInit(): void {

    this.dataSource = new CustomersDataSource(this.customerService);
    let genFilter : PageRequest<any> = {
      userId: this.userServ.currentAccount,
      pageNumber: 0,
      pageSize: this.pageSize
    }
    this.dataSource.loadCustomers(genFilter);

  }

  ngAfterViewInit() {

    fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            debounceTime(700),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadCustomersPage();
            })
        )
        .subscribe();

    this.paginator.page
    .pipe(
        tap(() => this.loadCustomersPage())
    )
    .subscribe();

  }

  loadCustomersPage() {
      let genFilter : PageRequest<any> = {
        userId: this.userServ.currentAccount,
        filterField: this.input.nativeElement.value? "id_number": undefined,
        filterData: this.input.nativeElement.value,
        pageNumber: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      }

      this.dataSource.loadCustomers(genFilter);
  }

  addCustomer() {
    console.log("open");
    // this.router.navigate(['/customers/add', ]);
  }

  editCustomer(customer:Customer) {
    console.log("startEdit:", customer);
    // this.router.navigate(['/services/edit/' + service.id, ]);
  }

}
