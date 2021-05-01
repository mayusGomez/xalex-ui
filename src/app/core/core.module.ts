import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { UsersService } from './services/users.service';
import { CalendarDayMonthComponent } from './components/calendar-day-month/calendar-day-month.component'

@NgModule({
  declarations: [HeaderComponent, CalendarDayMonthComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    HeaderComponent, 
    CalendarDayMonthComponent
  ],
  providers: [
    UsersService
  ]
})
export class CoreModule { }
