import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerResolver } from './customer.resolver.service';
import { AddCustomerComponent } from './add-customer/add-customer.component';

import { EditCustomerComponent } from './edit-customer/edit-customer.component';

const routes: Routes = [
  { 
    path: '', 
    component:  CustomersListComponent
  },
  { 
    path: 'add', 
    component:  AddCustomerComponent
  },
  {
    path: 'edit/:id',
    component: EditCustomerComponent,
    resolve: {
      service: CustomerResolver
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
