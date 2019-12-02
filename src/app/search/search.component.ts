import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKey: string;
  itemList: Product[] = [];
  searchedItemList: Product[] = [];
  isAdmin: boolean;
  category:string;
  searchValue:string;
  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.queryParamMap.subscribe(param => {
    this.category = param.get('category');
    console.log(this.category);  
  })

  //this.searchValue = this.route.snapshot.paramMap.get('search');
  //console.log(this.searchValue);
  /*if(this.category !== null) {*/
    /*this.productService.getProductsByCategory(this.category).subscribe((products) => {
      this.itemList = products;
    });
    this.*/
   /*  }
     else {*/
       this.productService.getAllItems().subscribe((products) => {
         this.itemList = products;
         console.log(products);
       });
       this.searchedItemList = this.itemList;
     
  }



  search(value: string) {
    this.searchedItemList = this.itemList.filter((product) => 
      product.productName.toLowerCase().includes(value.toLowerCase()));
    this.productService.getSubject().next(this.searchedItemList);
  }

}
