import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserTableComponent } from './user-table/user-table.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  { 
    path: '', 
    component:  UserViewComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
