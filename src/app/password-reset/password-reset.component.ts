import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../authenticate/auth.service';
import { FormValidator } from 'app-src-old/app/authenticate/form-validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form:FormGroup;
  resetForm: FormGroup;
  hasQuestion:boolean = false;
  answer:boolean = false;
  secQuestion:string;
  Answer:string;
  resetUser: string;
  answerForm:FormGroup;
  samePasswordError: boolean;
  resetRequest: boolean = false;
  constructor(private formBuilder: FormBuilder, private formsService: FormsService,
    private router: Router, private authService: AuthService, private route: ActivatedRoute) {

    this.form = formBuilder.group({
      userId : new FormControl('', [Validators.required, FormValidator.cannotContainSpace])
    });

    this.resetForm = formBuilder.group({
      password : new FormControl('',[Validators.required, Validators.minLength(4)]),
      confirmPassword : new FormControl('',[Validators.required, Validators.minLength(4)])
    })

    this.answerForm = formBuilder.group({
      secAnswer: new FormControl('',[Validators.required])
    })
  }
  ngOnInit() {
  }

  get userId() { return this.form.get('userId'); }

  get password() { return this.resetForm.get('password'); }

  get confirmPassword() { return this.resetForm.get('confirmPassword'); }

  get secAnswer() { return this.answerForm.get('secAnswer'); }

  getSecurityQuestion() {
    console.log('start of method');
    this.resetUser = this.userId.value;
    this.authService.getSecurityQuestion(this.userId.value).subscribe((res) => {
      this.secQuestion = res[0];
      this.Answer = res[1];
      this.hasQuestion = true;
      console.log(this.secQuestion, this.secAnswer, this.hasQuestion);
    }, error => {
      alert('UserId not found in database');
    });
  }

  checkAnswer() {
    if(this.Answer === this.secAnswer.value) {
      this.answer = true;
      this.hasQuestion = false;
    } else {
      alert('Invalid answer');
    }
  }

  async resetPassword() {
    this.resetRequest = true;
    await this.authService.resetPassword(this.password.value, this.resetUser).toPromise().then((res) =>{
      if(res === true)
        alert('Password changed. Now Login');
      else 
        this.samePasswordError = true;
    }, (error) => {
      alert('Could not reset password');
    });
    this.resetForm.reset();
  }
}
