import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../User';
import { environment } from "../../environments/environment"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private userAuthCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('user:pwd')
    })
  };
  private baseUrl = environment.baseUrl;
  constructor(private http : HttpClient) {

   }

   signup(user: User, isUser: boolean):Observable<Object> {
     return this.http.post(this.baseUrl+'/users/'+isUser,user, this.userAuthCredentials);
     //http://localhost:8082/users/true
   }
}
