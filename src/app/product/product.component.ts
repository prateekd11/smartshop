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
  selectedLevel:string = 'name';
  
  constructor(private route: ActivatedRoute, private productService: ProductService, 
    public authService:AuthService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(param => {
      this.category = param.get('category');
      this.itemName = param.get('itemName');
    });

   if(this.category != null) {
     //Shop by category functionality
    this.productService.getProductsByCategory(this.category, 'name').subscribe(products => {
      this.products = products;
    });
  }

  if(this.itemName != null) {
    //Quick search functionality
    this.productService.getAllItems().subscribe(products => {
      this.products = products.filter((product) => 
      product.productName.toLowerCase().includes(this.itemName.toLowerCase()));
    });

  }

  this.productService.getSubject().subscribe((data) => {
    this.products = data;
  });
  
    this.productService.products$.subscribe((data) => {
      this.products = data;
    });
   
  }

  selected(){
    this.productService.getSortedProducts(this.category, this.selectedLevel);

  }

}
