import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from './Product';
import { Observable, Subject } from 'rxjs';
import { Offer } from '../Offer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  userId="asdf";
  baseUrl : string = environment.baseUrl;
  private subject = new Subject<Product[]>();
  isAdmin: boolean;
  private userAuthCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('asdf:asdf')
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

  getProduct(productCode: String) :Observable<Product> {
    //return this.http.get<Product>(this.baseUrl + '/products/' +productId,this.adminAuthCredentials);
    return this.http.get<Product>(this.baseUrl+'/products/'+ productCode,this.userAuthCredentials);
  }

  updateProduct(smartshop:Product) {
    console.log(smartshop);
    this.http.put<Product>(this.baseUrl + '/products/', smartshop, this.userAuthCredentials).subscribe((res) => console.log(res))
  }

  delete(productCode:string):Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl+'/products/'+ productCode,this.userAuthCredentials);
  }

  editOffer(offer: Offer){
    return this.http.post(this.baseUrl+'/offers',offer,this.userAuthCredentials);
  }

  getOffer(productCode: string) {
    return this.http.get(this.baseUrl+'/offers/'+ productCode,this.userAuthCredentials);
  }
}
