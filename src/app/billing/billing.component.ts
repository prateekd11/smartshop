import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { purchase } from './purchase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { element } from '../../../node_modules/protractor';
import { BillingService } from './billing.service';
import { Router } from '@angular/router';
import { FormValidator } from '../authenticate/form-validator'

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  }

  public billingForm = new FormGroup({
    'userId': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'productCode': new FormControl('', [Validators.required]),
    'productQuantity': new FormControl('', [Validators.required,FormValidator.quantityNotValid])
  });


  isReedemed : boolean = false;
  allPurchase: purchase[] = [];
  Purchase: purchase;
  temp: purchase;
  Total: number = 0;
  Reward: number = 0;
  validUserId : string;
  Reward1 : number = 0;
  Total1 : number = 0;
  newReward : number = 0 ;
  currentUser: string = '';
  constructor(private http: HttpClient, private billingService: BillingService, private router: Router) { }

  ngOnInit() {

  }

  get userId() { return this.billingForm.get('userId');}
  get productCode() { return this.billingForm.get('productCode');}
  get productQuantity() { return this.billingForm.get('productQuantity');}

  checkUser() {
    this.billingService.checkUser(this.billingForm.get('userId').value).subscribe((res) =>  {
      if(res == false) {
        alert('Enter valid user id');
        this.userId.reset();
      }
      else{
        console.log('else part userId'+this.currentUser);
        this.currentUser = this.userId.value;
        document.getElementById('userId').hidden = true;
      }

      if (this.Reward === 0) {
        console.log('else part userId'+this.currentUser);
        this.http.get(`${environment.baseUrl}/reward/${this.currentUser}`, this.userAuthCredential)
          .subscribe((res: any) => { this.Reward = res as number; this.Reward1 = res as number;})
      }
    }); 
    
  }

  addToBill() {
  
    this.Purchase = new purchase();
    this.Purchase.productCode = this.billingForm.value['productCode'];
    this.Purchase.quantity = this.billingForm.value['productQuantity'];
    this.Purchase.userId = this.currentUser;

      this.http.get(`${environment.baseUrl}/products/${this.Purchase.productCode}`, this.userAuthCredential)
      .subscribe((res: any) => {
        if(res == null)
        {
          alert("Enter valid Product Code");
        }
        else{
        this.Total = 0;
        this.Total1 = 0;
        this.Purchase.productName = res.productName;
        console.log('this.Purchase.productName',this.Purchase.productName);
        this.Purchase.amount = (res.ratePerQuantity * this.Purchase.quantity);
          if(res.stockCount - this.Purchase.quantity >= 0)
          { 
            res.stockCount = (res.stockCount - this.Purchase.quantity);
            this.http.post(`${environment.baseUrl}/products`, res ,this.userAuthCredential)
            .subscribe((response: any) => {
            this.allPurchase.push(this.Purchase);
            this.allPurchase.forEach((obj: purchase) => {  this.Total += obj.amount; this.Total1 +=obj.amount; })
           })
          }
          else {
            this.allPurchase.forEach((obj: purchase) => {  this.Total += obj.amount; this.Total1 +=obj.amount; })
            alert("Stock is not enough") }
      }})

    this.billingForm.reset();
  }

  UseReward()
  {
      if(this.isReedemed === false)
      {
        
       if(this.Total < this.Reward)
       {
         this.Reward = this.Reward - this.Total;
         this.Total = 0;
       }
       else {
        this.Total -= this.Reward;
        this.Reward = 0;
       }

       this.isReedemed = true;
      }
      else if(this.isReedemed === true){
        this.Reward = this.Reward1;
        this.Total = this.Total1;
        this.isReedemed = false;
      }
  }
  
  addToPurchase() {
    console.log(this.allPurchase[0].userId);
    this.http.post(`${environment.baseUrl}/purchase`, this.allPurchase ,this.userAuthCredential)
    .subscribe((res: any) => { console.log("Success");
      this.newReward = 0;
      this.newReward = this.Reward + (this.Total / 20);
      this.Reward = Math.floor(this.newReward);
      this.http.post(`${environment.baseUrl}/reward/${this.Purchase.userId}/${this.Reward}`, null ,this.userAuthCredential)
     .subscribe((response: any) => { console.log("Reward Updated");})
    })

    this.router.navigate(['']);
  }

  

}
