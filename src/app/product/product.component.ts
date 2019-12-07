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
  product: Product;
  itemName: string;
  //searchValue:string;
  constructor(private route: ActivatedRoute, private productService: ProductService, 
    public authService:AuthService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(param => {
      this.category = param.get('category');
      this.itemName = param.get('itemName');
      console.log(this.category, this.itemName);
    });
   // this.route.snapshot.paramMap.get('search');
   if(this.category != null) {
    this.productService.getProductsByCategory(this.category).subscribe(products => {
      this.products = products;
      console.log("products", products)
      console.log("this.products ",this.products);
    });
  }
  if(this.itemName != null) {
    this.productService.getAllItems().subscribe(products => {
      this.products = products.filter((product) => 
      product.productName.toLowerCase().includes(this.itemName.toLowerCase()));
    this.productService.getSubject().next(this.products);
    });
  }
    this.productService.getSubject().subscribe((data) => {
      this.products = data;
    });
   
  }

}
