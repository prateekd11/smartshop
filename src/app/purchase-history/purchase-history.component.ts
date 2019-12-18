import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';
import { AuthService } from '../authenticate/auth.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  allPurchase: any[] = [];
  userId : string;
  constructor(private purchaseHistoryService : PurchaseHistoryService, private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.userId()
    this.purchaseHistoryService.getAllPurchase(this.userId)
    .subscribe( (res : any) => { this.allPurchase = res; console.log(res); });
  }

}
