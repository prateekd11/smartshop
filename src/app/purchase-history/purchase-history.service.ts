import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('asdf:asdf')
    })
  }

  constructor(private http: HttpClient) {

  }

  getAllPurchase(userId : string) {
    return this.http.get(`${environment.baseUrl}/purchase/${userId}`, this.userAuthCredential)
  }

}
