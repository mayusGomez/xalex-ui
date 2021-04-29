import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator } from "@angular/material/paginator";

import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent} from "rxjs";

import { UsersService } from './../../../core/services/users.service';
import { Services } from '../../../core/models/services';
import { ServicesDataSource } from './../../../core/services/services.datasource';
import { ServicesService } from './../../../core/services/services.service';
import { PageRequest } from '../../../core/models/page';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.sass']
})
export class ServicesListComponent implements OnInit {

  displayedColumns: string[] = ['action','description', 'price', 'cost'];
  dataSource: ServicesDataSource;
  pageSize:number= 10;

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

  addService() {
    console.log("open");
    this.router.navigate(['/services/add', ]);
  }

  editService(service:Services) {
    console.log("startEdit:", service);
    this.router.navigate(['/services/edit/' + service.id, ]);
  }

}
