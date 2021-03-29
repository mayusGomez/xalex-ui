import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { AppRoutingModule } from './users-routing.module'
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [UserTableComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    UserTableComponent
  ]
})
export class UsersModule { }
