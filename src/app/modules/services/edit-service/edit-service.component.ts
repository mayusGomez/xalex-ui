import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { UsersService } from './../../../core/services/users.service';
import { Services } from './../../../core/models/services';
import { ServicesService } from '../../../core/services/services.service';


@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {

  service: any;
  form: FormGroup;

  constructor(public fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private servServices: ServicesService,
    private userService: UsersService) { }

  ngOnInit(): void {

    this.service = this.route.snapshot.data.service;
    
    /*data.subscribe(
      (data: { service: Services }) => {
        this.service = data.service;
      }
    );*/

    console.log("Service from resolver:", this.service);

    this.form = this.fb.group({
      "id": ["", ],
      "description": ["", Validators.required],
      "price":["", Validators.required],
      "cost":["", Validators.required]
    });

    this.form.setValue({
      id: this.service.id,
      description: this.service.description,
      price: this.service.price,
      cost: this.service.cost
    });

  }

  onSubmit() {
    console.log("reactive form submitted");

    let service : Services = {
      id_user: this.userService.currentAccount,
      id: this.form.value.id,
      description: this.form.value.description,
      price: this.form.value.price,
      cost:this.form.value.cost,
    }

    console.log("Service to save:", service);
    this.servServices.update(service).subscribe(
      service => {
        this._snackBar.open("Servicio actualizado", "Ocultar");
      },
      err => {
        this._snackBar.open("Error al intentar actualizar servicio", "Ocultar");
      }
    );
    
  }

  goBack() {
    console.log("back");
    this.router.navigate(['../../', ], { relativeTo: this.route });
  }

}
