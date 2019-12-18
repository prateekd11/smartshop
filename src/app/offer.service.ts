import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Offer } from './Offer';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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
  private updatedOfferList: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
  subject = new Subject<Offer[]>();
  updatedList$: Observable<Offer[]> = this.updatedOfferList.asObservable();
  constructor(public http: HttpClient) {
   }

   getSubject(): Subject<Offer[]> {
    return this.subject;
  }

   getAllOffers():Observable<Offer[]> {
     return this.http.get<Offer[]>(this.baseUrl+'/offers', this.userAuthCredentials);
   }

   delete(productCode) {
    this.http.delete(this.baseUrl+'/offers/'+productCode ,this.userAuthCredentials)
    .toPromise().then((res: any) => {  
      this.getAllOffers().toPromise().then((offers) => {
        this.updatedOfferList.next(offers);
      }) 
    });
   }

   getOfferByProductCode(productCode) {
    return this.http.get<Offer>(this.baseUrl+'/offers/'+productCode, this.userAuthCredentials);
  }
}
