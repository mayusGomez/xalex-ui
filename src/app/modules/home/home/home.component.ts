import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public authServ : AuthService) { }

  ngOnInit(): void {
    this.authServ.handleAuthentication();
  }

  public logout(): void{
    this.authServ.logout();
  }

}
