import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass']
})
export class UserTableComponent implements OnInit {

  notes = [
    {
      name: 'customers',
      desc: 'Inicio',
      icon: 'home'
    },
    {
      name: 'users',
      desc: 'Cuenta',
      icon: 'account_balance'
    }
  ]

  user: User;

  constructor(private authServ : AuthService, private userServ : UsersService) {
    this.user = {
      name: "",
      id: "",
      email:""
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userServ.getUser(this.authServ.user)
      .subscribe(user => this.user = user);
  }

}
