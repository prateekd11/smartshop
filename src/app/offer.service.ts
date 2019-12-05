import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Offer } from './Offer';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  
  private userAuthCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  };
  baseUrl:string = environment.baseUrl;
  subject = new Subject<Offer[]>();
  constructor(public http: HttpClient) {
   }

   getSubject(): Subject<Offer[]> {
    return this.subject;
  }

   getAllOffers():Observable<Offer[]> {
     return this.http.get<Offer[]>(this.baseUrl+'/offers', this.userAuthCredentials);
   }

   delete(productCode) {
    return this.http.delete(this.baseUrl+'/offers/'+productCode ,this.userAuthCredentials);
   }

   getOfferByProductCode(productCode) {
    return this.http.get<Offer>(this.baseUrl+'/offers/'+productCode, this.userAuthCredentials);
  }
}
