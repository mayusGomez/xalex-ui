import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './services-routing.module'
import {ReactiveFormsModule} from "@angular/forms";

import { EditableServiResolver } from './edit-service.resolver.service';

import { ServicesListComponent } from './services-list/services-list.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatButtonModule} from '@angular/material/button';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';


@NgModule({
  declarations: [ServicesListComponent, AddServiceComponent, EditServiceComponent],
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
  providers: [EditableServiResolver]
})
export class ServicesModule { }
