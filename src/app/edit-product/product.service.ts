import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  productList: product[]=[];

  userAuthCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('user:pwd')
    })
  };
  adminAuthCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('M001:pwd')
    })
  };

  constructor( private router: Router,private http: HttpClient) {}



    getProduct(productCode: String) :Observable<product> {
      return this.http.get<product>(this.baseUrl + '/products/' +productCode,this.adminAuthCredentials);
    }

    updateProduct(smartshop:product) {

      this.http.put<product>(this.baseUrl + '/products/', smartshop, this.adminAuthCredentials).subscribe((res) => console.log(res))
    }
      
}
