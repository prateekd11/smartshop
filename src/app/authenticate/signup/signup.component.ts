import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { FormValidator } from '../form-validator';
import { FormsService } from 'src/app/services/forms.service';
import { User } from 'src/app/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private isUser:boolean = false;
  private form: FormGroup;

  constructor(formBuilder: FormBuilder, private forms: FormsService, private route: Router) { 

    this.form = formBuilder.group({
      firstName : new FormControl('',[Validators.required, Validators.minLength(2)]),
      lastName : new FormControl('',[Validators.required, Validators.minLength(2)]),
      userId : new FormControl('',[Validators.required, Validators.minLength(4), 
        FormValidator.cannotContainSpace]),
      contactNumber : new FormControl('',[Validators.required, Validators.minLength(10)]),
      password : new FormControl('',[Validators.required, Validators.minLength(4)]),
      confirmPassword : new FormControl('',[Validators.required, Validators.minLength(4)]),
      gender: new FormControl(null,Validators.required),
      age:new FormControl('',Validators.required),
      secQuestion : new FormControl('', Validators.required),
      secAnswer : new FormControl('', Validators.required)
    }, {validator: FormValidator.passwordsMustMatch});
  }

  ngOnInit() {
  }

  changeLogin() { this.isUser = !this.isUser; }

  get firstName () { return this.form.get('firstName'); }

  get lastName () { return this.form.get('lastName'); }

  get userId() { return this.form.get('userId'); }

  get contactNumber() { return this.form.get('contactNumber'); }

  get password() { return this.form.get('password'); }

  get confirmPassword() { return this.form.get('confirmPassword'); }

  get secQuestion(){ return this.form.get('secQuestion'); }

  get secAnswer() { return this.form.get('secAnswer');}

  get age() { return this.form.get('age');}


  submit() {
    let user: User = this.form.value;
    this.forms.signup(user, this.isUser).subscribe((res: Response) => {
        if(res.status) {
          alert('Signup successful!! Now Log in');
        }
    }, (error: Response) => {
        if(error.status)
        alert('Signup failed!! Please try again later.')
    });
    this.clearForm();
  }

  clearForm() {
    this.firstName.reset();
    this.lastName.reset();
    this.password.reset();
    this.secAnswer.reset();
    this.secQuestion.reset();
    this.age.reset();
    this.userId.reset();
    this.confirmPassword.reset();
    this.contactNumber.reset();
    this.form.reset();
  }

}
