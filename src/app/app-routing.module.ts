import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuardService} from './auth-guard.service'

import { HomeComponent } from './modules/home/home/home.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'services',
    loadChildren: './modules/services/services.module#ServicesModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'customers',
    loadChildren: './modules/customers/customers.module#CustomersModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    loadChildren: './modules/users/users.module#UsersModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
