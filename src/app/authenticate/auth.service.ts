import { Injectable } from '@angular/core';
import { User } from '../User';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: User;
  redirectUrl = '/';
  name: string;
  validCredentials: boolean = false;
  userId: string;

  cartMenuItemId: number = 0;
 // isManager: boolean = false;
  isUser: boolean = false;

  constructor(private productService: ProductService, public router: Router, private http: HttpClient) { 

  }

  baseUrl = environment.baseUrl;
  private authenticationApiUrl = this.baseUrl + '/authenticate';
  private token: string;
  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  };

  authenticate(user: string, password: string): Observable<any> {
    let credentials = btoa(user + ':' + password);
    console.log('credentials'+ user)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + credentials);
    return this.http.get(this.authenticationApiUrl,  {headers} );
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  public getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isManager() {
    if(this.getRole() === 'ROLE_MANAGER')
      return true;
    return false;
  }
  isAdmin() {
    if(this.getRole() === 'ROLE_ADMIN')
      return true;
    return false;
  }
  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  isApproved(userId: string):Observable<boolean[]> {
    return this.http.get<boolean[]>(this.baseUrl+'/users/approved/'+userId, this.authCredentials);
  }

  accountExists(userId: string) {
    return this.http.get<boolean>(this.baseUrl+'/users/'+userId, this.authCredentials);
  }

  getSecurityQuestion(userId):Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl+'/users/resetpassword/'+userId, this.authCredentials);
  }

  resetPassword(password: string, userId: string){
    return this.http.post(this.baseUrl+'/users/resetpassword/'+userId+'/'+password,{}, this.authCredentials);

  }

  loggedIn():boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
