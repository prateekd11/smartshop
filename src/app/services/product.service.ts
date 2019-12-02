import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from './Product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  userId="asdf";
  baseUrl : string = environment.baseUrl;
  private subject = new Subject<Product[]>();
  private userAuthCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('user:pwd')
    })
  };
  
  constructor(private http: HttpClient) { }

  getSubject(): Subject<Product[]> {
    return this.subject;
  }

  search(productName : string) {
    //TODO add actual userId of Logged in User
    this.http.get(this.baseUrl+'/products/'+productName+'/'+this.userId);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'/products/productType/'+category, this.userAuthCredentials);
  }

  getAllItems() {
    return this.http.get<Product[]>(this.baseUrl+'/products', this.userAuthCredentials);
  }
}
