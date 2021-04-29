import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerTableComponent } from './customer-table/customer-table.component';

import { ServicesResolver } from './customer-table/customer-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component:  CustomerTableComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
