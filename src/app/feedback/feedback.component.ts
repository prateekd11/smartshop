import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserFeedback } from './UserFeedback';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../authenticate/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  loading:boolean = false;
  form = new FormGroup({
    ratingQues1: new FormControl('', [Validators.required]),
    ratingQues2: new FormControl('', [Validators.required]),
    ratingQues3: new FormControl('', [Validators.required]),
    ratingQues4: new FormControl('', [Validators.required]),
    ratingQues5: new FormControl('', [Validators.required])
  });

  private userAuthCredential = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('zxcv:zxcv')
  })
}
userFeedback: UserFeedback;

feedbackQuestion: String[] = [];
answer: String[] = [];
answerNames : String[] = ['ratingQues1',
  'ratingQues2',
  'ratingQues3',
  'ratingQues4',
  'ratingQues5'
];
  public url: String = environment.baseUrl;

constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.userFeedback = new UserFeedback();  
}

ngOnInit() {
  this.loading = true;
  this.http.get(`${this.url}/feedback`, this.userAuthCredential)
    .subscribe((res: any) => { 
      this.loading = false;  
      this.feedbackQuestion = res });
}

submit() { 
  this,this.loading = true;
    this.userFeedback.userId = this.authService.userId();
    this.userFeedback.ratingQues1 = this.form.get('ratingQues1').value;
    this.userFeedback.ratingQues2 = this.form.get('ratingQues2').value;
    this.userFeedback.ratingQues3 = this.form.get('ratingQues3').value;
    this.userFeedback.ratingQues4 = this.form.get('ratingQues4').value;
    this.userFeedback.ratingQues5 = this.form.get('ratingQues5').value;
    this.form.reset();
  console.log(this.userFeedback);
  this.http.post(`${this.url}/feedback`, this.userFeedback, this.userAuthCredential).subscribe((res) =>{ 
    this.loading = false;
    this.router.navigate(['']);
  });
}



}

