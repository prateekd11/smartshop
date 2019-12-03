import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../services/Product';
import { AuthService } from '../authenticate/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  category: string;
  products : Product[] = [];
  //searchValue:string;
  constructor(private route: ActivatedRoute, private productService: ProductService, 
    private authService:AuthService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(param => {
      this.category = param.get('category');
      console.log(this.category);
    });
   // this.route.snapshot.paramMap.get('search');
    this.productService.getProductsByCategory(this.category).subscribe(products => {
      this.products = products;
      console.log("products ",this.products);
    });
    this.productService.getSubject().subscribe((data) => {
      this.products = data;
    });
   
  }

}
