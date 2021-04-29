import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

import { UsersService } from './../../../core/services/users.service';
import { Services } from './../../../core/models/services';
import { ServicesService } from '../../../core/services/services.service';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.sass']
})
export class AddServiceComponent implements OnInit {

  form = this.fb.group({
      "id": ["", ],
      "description": ["", Validators.required],
      "price":["", Validators.required],
      "cost":["", Validators.required]
  });
  
  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private servServices: ServicesService,
    private userService: UsersService
  ) {
  }
  
  onSubmit() {
      console.log("reactive form submitted");

      let service : Services = {
        id_user: this.userService.currentAccount,
        description: this.form.value.description,
        price: this.form.value.price,
        cost:this.form.value.cost,
      }

      console.log("Service to save:", service);
      this.servServices.post(service).subscribe(
        service => {
          this._snackBar.open("Servicio guardado", "Ocultar");
        },
        err => {
          this._snackBar.open("Error al intentar agregar servicio", "Ocultar");
        }
      );
      
  }

  ngOnInit(): void {
  }

  goBack() {
    console.log("back");
    this.router.navigate(['../', ], { relativeTo: this.route });
  }

  cleanForm(){
    this.form.reset()
  }

}
