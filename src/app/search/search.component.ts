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
  itemName:string;
  searchValue:string;
  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  async ngOnInit() {

    this.route.queryParamMap.subscribe(param => {
    this.itemName = param.get('itemName');
    console.log(this.itemName);  
    this.search(this.itemName);
  })

       await this.productService.getAllItems().toPromise().then((products) => {
         this.itemList = products;
         console.log(products);
       });
       this.searchedItemList = this.itemList;
     
  }



  search(value: string) {
    console.log("calling search")
    this.searchedItemList = this.itemList.filter((product) => 
      product.productName.toLowerCase().includes(value.toLowerCase()));
    this.productService.getSubject().next(this.searchedItemList);
  }

}
