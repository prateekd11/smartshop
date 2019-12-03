import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { FormValidator } from '../form-validator';
import { FormsService } from 'src/app/services/forms.service';
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ProductService } from 'src/app/services/product.service';

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
  constructor(private formBuilder: FormBuilder, private formsService: FormsService,
    private router: Router, private authService: AuthService, private route: ActivatedRoute) {

    this.form = formBuilder.group({
      userId : new FormControl('', [Validators.required, FormValidator.cannotContainSpace]),
      password : new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
    this.route.queryParamMap.subscribe(param => {
      this.redirect = param.get('from');
    });
    if(this.redirect !== null) {
      console.log(this.redirect);
      this.router.navigate['/'+this.redirect];
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
       this.approved = res;
    })
    if(this.approved == true) {
    await this.authService.authenticate(this.form.value.userId, this.form.value.password).toPromise().then(async (res) => {
      this.successLogin = true;
      this.authService.setToken(res.token);
      //this.authService.isAdmin = false;
      this.authService.loggedIn = true;
      this.authService.userId = this.userId.value;
      //this.productService.isLoggedIn = true;
      this.authService.name = this.form.value.username;
      if (res.role === 'ROLE_ADMIN') {
        this.authService.isAdmin = true;
      } else if(res.role === 'ROLE_MANAGER') {
        this.authService.isManager = true;
      } else {
        this.authService.isUser = true;
      }
      this.router.navigateByUrl('');
      this.validCredentials = true;
      this.router.navigate(['']);
    }, () => { this.successLogin = false; this.validCredentials = false; }
    );
  } else {
    alert('Your account is not yet approved. Please contact admin');
  }
}
}
