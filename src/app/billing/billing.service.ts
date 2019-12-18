import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  }
  baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  checkUser(userId: string) {
    return this.http.get(this.baseUrl+'/users/'+userId,this.userAuthCredential);
  }
}
