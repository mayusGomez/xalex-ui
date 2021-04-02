import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import {AuthGuardService} from './auth-guard.service'
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';

import { CoreModule } from './core/core.module';
import { CustomersModule } from './modules/customers/customers.module'
import { UsersModule } from './modules/users/users.module'
import { HomeModule } from './modules/home/home.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    CustomersModule,
    UsersModule,
    HomeModule,
    FormsModule
  ],
  providers: [AuthGuardService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
