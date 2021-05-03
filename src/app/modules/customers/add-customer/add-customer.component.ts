import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } 
    from '@angular/forms';

import {default_year} from '../conf';
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
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class AddCustomerComponent implements OnInit{

  customHeader = CalendarDayMonthComponent;
  dateControl = new FormControl(moment(), []);

  form: FormGroup;
  aux_mobile_phone: FormArray;

  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private customerService: CustomersService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: ["", ],
      name: ["", Validators.required],
      last_name:["", Validators.required],
      main_mobile_phone:["", Validators.required],
      // aux_mobile_phone: this.fb.array([ this.createAuxMobPhone() ]),
      email: ["", [Validators.email, ]],
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

  }

  createAuxMobPhone(): FormGroup{
    return this.fb.group({
      number: '',
      label: '',
      source: ''
    });
  }

  addAuxMobPhone(): void {
    this.aux_mobile_phone = this.form.get('aux_mobile_phone') as FormArray;
    this.aux_mobile_phone.push(this.createAuxMobPhone());
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

    // console.log("customer:", customer);

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
    this.router.navigate(['../', ], { relativeTo: this.route });
  }

  cleanForm(){
    this.form.reset()
  }

}
