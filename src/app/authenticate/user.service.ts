import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { User } from '../User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;


  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  };

  constructor(private http: HttpClient) {
  }

  signup(user: User, isUser: boolean):Observable<boolean> {
    console.log('in user service');
    return this.http.post<boolean>(this.baseUrl+'/users/'+isUser,user, this.authCredentials)
  }

  getUsers() {
    this.http.get(this.baseUrl + '/users/', this.authCredentials).subscribe((res) => console.log(res));
  }
}
