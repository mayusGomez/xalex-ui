import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {take} from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, map, tap } from 'rxjs/operators';


import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } 
    from '@angular/forms';

import { UsersService } from './../../../core/services/users.service';
import { Quote } from './../../../core/models/quote';
import { Page } from './../../../core/models/page';
import { User, Professional } from './../../../core/models/user';
import { QuotesService } from '../../../core/services/quotes.service';
import { CustomersService } from '../../../core/services/customers.service';
import { AuthService } from '../../../auth.service';
import { Observable, of, fromEvent } from 'rxjs';
import { Customer } from 'src/app/core/models/customer';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.sass']
})
export class AddQuoteComponent implements OnInit {

  quoteForm: FormGroup;
  servicesArr: FormArray;

  customerControl = new FormControl();
  professionalControl = new FormControl();

  user$: Observable<User>;
  professionals : Professional[];

  customers$: Observable<any>;

  @ViewChild('input', { static: true }) input: ElementRef;
  

  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private quoteService: QuotesService,
    private userService: UsersService,
    private authServ : AuthService,
    private customerService: CustomersService
  ) { 

    this.userService.getUser(this.authServ.user).subscribe(
      user => {
        console.log("load profe:", user.professionals)
        this.professionals = user.professionals;
      }
    );

  }

  ngOnInit(): void {

    this.quoteForm = this.fb.group({
      customer: this.customerControl,
      professional: this.professionalControl,
      description: ["", ],
      services: this.fb.array([this.getUnit()]),
    });
    // this.quoteForm.reset();

    this.customers$ =fromEvent(this.input.nativeElement,'keyup')
      .pipe(
          debounceTime(1000),
          //distinctUntilChanged(),
          tap(() => {
            console.log("keyup");
            this.loadCustomer();
          })
      );

  }

  loadCustomer(){
    console.log("Load customer")
    //console.log(this.input.nativeElement.value)

    this.customers$ = this.customerService.query({
              userId: this.userService.currentAccount,
              filterField: 'id_number',
              filterData: this.input.nativeElement.value,
              pageNumber: 0,
              pageSize: 10
            }).pipe(
              map( customerData => customerData.data)
            );
    
  }

  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();

    if (model['customer']['id'] == undefined){
      alert("Por favor seleccione un cliente válido");
      return
    }

    if (model['professional']['code'] == undefined){
      alert("Por favor seleccione un profesional válido");
      return
    }

    let quoteObj:Quote = {
      id_user: this.userService.currentAccount,
      customer: {
        id:model['customer']['id'],
	      name:model['customer']['name'],
	      last_name:model['customer']['last_name'],
	      main_mobile_phone: model['customer']['main_mobile_phone'],
	      email:model['customer']['email'],
	      id_type:model['customer']['id_type'],
	      id_number:model['customer']['id_number'],
      },
      professional: model['professional'],
      description: model['description'],
      services: model['services']
    };
    console.log(quoteObj);

    this.quoteService.post(quoteObj).subscribe(
      quote => {
        this._snackBar.open("Cotizacion guardado", "Ocultar");
      },
      err => {
        this._snackBar.open("Error al intentar agregar Cotizacion", "Ocultar");
      }
    );;

    //alert("Form data are: " + JSON.stringify(model));
  }

  displayFn(professional: Professional): string {
    return professional && professional.name ? professional.name : '';
  }

  displayFnCust(customer: Customer): string {
    return customer && customer.id_number ? customer.id_number + " " + customer.name : '';
  }

  private getUnit() {
    const numberPatern = "^[0-9.,]+$";
    return this.fb.group({
      description: ["", Validators.required],
      price: [1, [Validators.required, Validators.pattern(numberPatern)]]
    });
  }

  /**
   * Add new unit row into form
   */
   addUnit() {
    const control = <FormArray>this.quoteForm.controls["services"];
    control.push(this.getUnit());
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeUnit(i: number) {
    const control = <FormArray>this.quoteForm.controls["services"];
    control.removeAt(i);
  }

  /**
   * This is one of the way how clear units fields.
   */
  clearAllUnits() {
    const control = <FormArray>this.quoteForm.controls["services"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getUnit());
  }

}
