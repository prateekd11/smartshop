import { Component, OnInit } from '@angular/core';
import { Offer } from '../Offer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  offerDate1: Date;
  productCode1: String;
  discountedRate1: Number;
  offerName1: String;
  offer: Offer;
  productCode: string;

  constructor(public offerService: OfferService, private route: ActivatedRoute) {
  }

  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  }

  Edit() {
    this.offer = {
      offerDate: this.offerDate1,
      productCode: this.productCode1,
      discountedRate: this.discountedRate1,
      offerName: this.offerName1
    }
    /*this.http.post(`${environment.baseUrl}/offers`, this.offer, this.userAuthCredential)
      .subscribe((res: any) => { console.log("Edited") });*/
  }

  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      this.productCode = params['id'];
      console.log(this.productCode);
    });

    this.offerService.getOfferByProductCode(this.productCode)
      .subscribe((res: Offer) => { this.offer = res as Offer; console.log(this.offer) });
    
  }

}
