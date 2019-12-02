import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { FormValidator } from '../form-validator';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  constructor(private formBuilder: FormBuilder, private formsService: FormsService) {

    this.form = formBuilder.group({
      userId : new FormControl('', [Validators.required, FormValidator.cannotContainSpace]),
      password : new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
  }

  get userId() {
    return this.form.get('userId');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    this.formsService.login(this.form.value);
  }
}
