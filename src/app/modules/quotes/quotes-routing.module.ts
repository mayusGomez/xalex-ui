import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuoteListComponent } from './quote-list/quote-list.component'
import { QuoteServiceResolver } from './quote.resolver.service';
import { AddQuoteComponent } from './add-quote/add-quote.component';

const routes: Routes = [
  { 
    path: '', 
    component:  QuoteListComponent
  },
  { 
    path: 'add', 
    component:  AddQuoteComponent
  },
  {
    path: 'edit/:id',
    component: QuoteListComponent,
    resolve: {
      service: QuoteServiceResolver
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
