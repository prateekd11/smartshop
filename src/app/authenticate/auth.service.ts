import { Injectable } from '@angular/core';
import { User } from '../User';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedInUser: User;
  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  userId: string;

  cartMenuItemId: number = 0;
  isAdmin: boolean = false;
  isManager: boolean = false;
  isUser: boolean = false;

  constructor(private productService: ProductService, public router: Router, private http: HttpClient) { }

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
  }
  public getToken() {
    return this.token;
  }

  isApproved(userId: string):Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl+'/users/approved/'+userId, this.authCredentials);
  }

  logout() {
    this.loggedInUser = null;
    this.isAdmin = false;
    this.isUser = false;
    this.isManager = false;
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}
