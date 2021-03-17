import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { AppRoutingModule } from './customers-routing.module'

@NgModule({
  declarations: [CustomerTableComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    CustomerTableComponent
  ]
})
export class CustomersModule { }
