import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit {

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
