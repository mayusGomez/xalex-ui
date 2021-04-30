import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './customers-routing.module'
import {ReactiveFormsModule} from "@angular/forms";

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatButtonModule} from '@angular/material/button';

import { CustomersListComponent } from './customers-list/customers-list.component';
import {CustomerResolver} from './customers.resolver.service';

@NgModule({
  declarations: [CustomersListComponent],
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
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomerResolver
  ]
})
export class CustomersModule { }
