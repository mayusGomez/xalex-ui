import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder, FormControl } 
    from '@angular/forms';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import { default_year } from '../conf';
import { UsersService } from './../../../core/services/users.service';
import { Customer } from './../../../core/models/customer';
import { CustomersService } from '../../../core/services/customers.service';

import { CalendarDayMonthComponent} from '../../../core/components/calendar-day-month/calendar-day-month.component';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MMM',
  },
  display: {
    dateInput: 'DD/MMM',
    monthYearLabel: 'MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class EditCustomerComponent implements OnInit {

  service: any;
  form: FormGroup;

  customHeader = CalendarDayMonthComponent;
  dateControl = new FormControl(moment(), []);

  constructor(public fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private customerService: CustomersService,
    private userService: UsersService) { }

  ngOnInit(): void {

    this.service = this.route.snapshot.data.service;

    this.form = this.fb.group({
      id: ["", ],
      name: ["", Validators.required],
      last_name:["", Validators.required],
      main_mobile_phone:["", Validators.required],
      email: ["", [Validators.required, Validators.email, ]],
      id_type: ["", Validators.required],
      id_number: ["", Validators.required],
      location: this.fb.group({
        address: [""]
      }),
      birth_date: this.fb.group({
        day_month: this.dateControl,
        year: [""]
      }),
    });
    this.form.reset();

    console.log("Resolver serv:",this.service);

    let birth_date: any = {};
    if (this.service.birth_date){
      birth_date["day_month"] = moment(this.service.birth_date.date, "YYYYMMDD");
      birth_date["year"] = this.service.birth_date.year;
    } 

    console.log("birth_date:", birth_date)

    this.form.patchValue({
      id: this.service.id,
      name: this.service.name,
      last_name: this.service.last_name,
      main_mobile_phone: this.service.main_mobile_phone,
      email: this.service.email,
      id_type: this.service.id_type,
      id_number: this.service.id_number,
      location: this.service.location,
      birth_date: birth_date
    });

  }

  onSubmit() {

    let customer: Customer = {
      id_user: this.userService.currentAccount,
      name: this.form.value.name,
      last_name: this.form.value.last_name,
      main_mobile_phone: this.form.value.main_mobile_phone,
      email: this.form.value.email,
      id_type: this.form.value.id_type,
      id_number: this.form.value.id_number,
      location: {
        address: this.form.value.location.address
      }
    }

    if (this.form.value.birth_date.day_month !== null){
      if (this.form.value.birth_date.year){
        this.form.value.birth_date.day_month.set({'year':this.form.value.birth_date.year});
      }else{
        this.form.value.birth_date.day_month.set({'year':default_year});
      }
      this.form.value.birth_date.day_month.startOf('day');
  
      customer.birth_date = { 
        date : +this.form.value.birth_date.day_month.format("YYYYMMDD"),
        day: +this.form.value.birth_date.day_month.format('D'),
        month: +this.form.value.birth_date.day_month.format('M'),
      }
    }

    if (this.form.value.birth_date.year){
      if (customer.birth_date) {
        customer.birth_date.year = this.form.value.birth_date.year;
      } else {
        customer.birth_date = {
          year : this.form.value.birth_date.year
        }
      }
    }

    this.customerService.post(customer).subscribe(
      service => {
        this._snackBar.open("Cliente guardado", "Ocultar");
      },
      err => {
        this._snackBar.open("Error al intentar agregar cliente", "Ocultar");
      }
    );
    
  }

  goBack() {
    console.log("back");
    this.router.navigate(['../../', ], { relativeTo: this.route });
  }

}
