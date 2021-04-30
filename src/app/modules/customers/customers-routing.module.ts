import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerResolver } from './customers.resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component:  CustomersListComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
