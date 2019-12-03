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

  constructor( private authService: AuthService) {

  }

  ngOnInit() {
   // this.isAdmin = this.foodService.isAdmin;
  }

}
