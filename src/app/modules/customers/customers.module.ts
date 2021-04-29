import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { AppRoutingModule } from './customers-routing.module'

import {FormsModule, ReactiveFormsModule} from "@angular/forms";


import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatButtonModule} from '@angular/material/button'

import { ServicesResolver } from './customer-table/customer-resolver.service';

@NgModule({
  declarations: [CustomerTableComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerTableComponent
  ],
  providers: [
    ServicesResolver
  ]
})
export class CustomersModule { }
