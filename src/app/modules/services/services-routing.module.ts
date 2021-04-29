import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesListComponent } from './services-list/services-list.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditableServiResolver } from './edit-service.resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component:  ServicesListComponent
  },
  { 
    path: 'add', 
    component:  AddServiceComponent
  },
  {
    path: 'edit/:id',
    component: EditServiceComponent,
    resolve: {
      service: EditableServiResolver
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
