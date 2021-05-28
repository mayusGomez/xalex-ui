import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {take} from 'rxjs/operators';


import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } 
    from '@angular/forms';

import { UsersService } from './../../../core/services/users.service';
import { Quote } from './../../../core/models/quote';
import { User, Professional } from './../../../core/models/user';
import { QuotesService } from '../../../core/services/quotes.service';
import { AuthService } from '../../../auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.sass']
})
export class AddQuoteComponent implements OnInit {

  quoteForm: FormGroup;
  servicesArr: FormArray;
  professionalControl = new FormControl();

  user$: Observable<User>;
  professionals : Professional[];
  

  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private quoteService: QuotesService,
    private userService: UsersService,
    private authServ : AuthService
  ) { 

    this.userService.getUser(this.authServ.user).subscribe(
      user => {
        console.log("load profe:", user.professionals)
        this.professionals = user.professionals;
      }
    );

  }

  ngOnInit(): void {

    this.quoteForm = this.fb.group({
      /*customer: this.fb.group({
        id: ["", ],
        id_number: ["", ],
        id_type: ["",],
        name: ["", ], 
        last_name: ["", ],
        main_mobile_phone: ["", ],
        email: ["", ],
      }),*/
      professional: this.professionalControl,
      description: ["", ],
      //services: this.fb.array([]),
    });
    this.quoteForm.reset();

  }

  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
    console.log(this.professionals);
    alert("Form data are: " + JSON.stringify(model));
  }

  displayFn(professional: Professional): string {
    return professional && professional.name ? professional.name : '';
  }

}
