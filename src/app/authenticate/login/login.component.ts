import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { FormValidator } from '../form-validator';
import { FormsService } from '../../services/forms.service';
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  successLogin: boolean;
  validCredentials: boolean;
  approved: boolean = false;
  redirect: string;
  submitted: boolean = false;
  accountExists: boolean = false;
  constructor(private formBuilder: FormBuilder, private formsService: FormsService,
    private router: Router, private authService: AuthService, private route: ActivatedRoute) {

    this.form = formBuilder.group({
      userId : new FormControl('', [Validators.required, FormValidator.cannotContainSpace]),
      password : new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
    if(this.authService.getToken() != null) {
      this.successLogin = true;
      this.validCredentials= true;
      console.log('Token is extracted. Token is correct. '+ this.authService.getToken());
    }
  }

  get userId() {
    return this.form.get('userId');
  }

  get password() {
    return this.form.get('password');
  }

  async submit() {
    await this.authService.isApproved(this.userId.value).toPromise().then(res =>{
    this.accountExists = res[0];
    this.approved = res[1];
      console.log(this.approved, this.accountExists);
    })
    if(this.approved && this.accountExists) {
    await this.authService.authenticate(this.form.value.userId, this.form.value.password).toPromise().then((res) => {
      this.successLogin = true;
      this.authService.setToken(res.token);
      this.authService.setRole(res.role);
      this.authService.userId = this.userId.value;
      this.authService.name = this.form.value.username;
      this.router.navigateByUrl('');
      this.validCredentials = true;
      this.router.navigate(['']);
    }, error => { 
      this.successLogin = false; 
      this.validCredentials = false; }
    );
    this.submitted = true;
  } else if(!this.approved && this.accountExists) {
    alert('Your account is not yet approved. Please contact admin');
  } else if(!this.accountExists) {
    alert('Account wih that user Id does not exists');
  }
}
}
