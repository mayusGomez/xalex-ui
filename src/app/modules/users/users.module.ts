import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { AppRoutingModule } from './users-routing.module'
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { UserViewComponent } from './user-view/user-view.component';



@NgModule({
  declarations: [UserTableComponent, UserViewComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatDividerModule,
    MatListModule,
    FormsModule
  ],
  exports: [
    UserTableComponent
  ]
})
export class UsersModule { }
