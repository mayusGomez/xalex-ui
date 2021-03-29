import { Component, OnInit } from '@angular/core';

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

  
  constructor() { }

  ngOnInit(): void {
  }

}
