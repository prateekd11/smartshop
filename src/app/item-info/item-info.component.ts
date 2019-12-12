import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Product } from '../services/Product';
import { AuthService } from '../authenticate/auth.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  @Input('product') product: Product;
  cartAddedId: number;


  constructor( public authService: AuthService) {

  }

  ngOnInit() {
   console.log(this.product.productType);
  }

  newProduct(product: Product) {
    let date = new Date();
    let newDate = date.getDate() - 8;
    date.setDate(newDate);
    let cmpDate = date.toISOString().substring(0,10);
    let addDate = product.addDate.toString().substring(0,10);
   if(Date.parse(cmpDate)  < Date.parse(addDate) ){
     return true;
   }
   return false;
  }

}
