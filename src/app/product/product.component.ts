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
  loading:boolean = false;
  constructor(private route: ActivatedRoute, public productService: ProductService, 
    public authService:AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.route.queryParamMap.subscribe(param => {
      this.category = param.get('category');
      this.itemName = param.get('itemName');
    });

   if(this.category != null) {
     //Shop by category functionality
    this.productService.getProductsByCategory(this.category, 'name').subscribe(products => {
      this.loading = false;
      this.products = products;
      if(this.products.length > 0){
        this.productService.notFound = false;
      }
    });
  }

  if(this.itemName != null) {
    //Quick search functionality
    this.productService.getAllItems().subscribe(products => {
      this.loading = false;
      this.products = products.filter((product) => 
      product.productName.toLowerCase().includes(this.itemName.toLowerCase()));
      if(this.products.length > 0){
        this.productService.notFound = false;
      }
    });

  }

  this.productService.getSubject().subscribe((data) => {
    this.products = data;
    if(this.products.length > 0){
      this.productService.notFound = false;
    }
  });
  
    this.productService.products$.subscribe((data) => {
      this.products = data;
      if(this.products.length > 0){
        this.productService.notFound = false;
      }
    });

   
  }

  selected(){
    if(this.selectedLevel != null || this.selectedLevel !='')
      this.productService.getSortedProducts(this.category, this.selectedLevel);
  }

}
