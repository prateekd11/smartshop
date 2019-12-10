import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from './Product';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Offer } from '../Offer';
import { product } from '../edit-product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  
  baseUrl : string = environment.baseUrl;
  private updateProductsList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private searchedProductsList: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.updateProductsList.asObservable();
  searched$:  Observable<Product[]> = this.searchedProductsList.asObservable();
  subject = new Subject<Product[]>();
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
    this.http.get(this.baseUrl+'/products/'+productName+'/'+localStorage.getItem('userId'));
  }

  getProductsByCategory(category: string, productType: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'/products/sorted/'+productType+'/'
    +category, this.userAuthCredentials);
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

  getSortedProducts(category: string, sortBy: string){
    console.log(this.baseUrl+'/products/sorted/'+sortBy+'/'
    +category);
    this.http.get<Product[]>(this.baseUrl+'/products/sorted/'+sortBy+'/'
    +category, this.userAuthCredentials).toPromise().then((products) => {
      this.updateProductsList.next(products);
    })
  }
}
