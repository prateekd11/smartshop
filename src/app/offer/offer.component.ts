import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Offer } from '../Offer';
import { AuthService } from '../authenticate/auth.service';
import { OfferService } from '../offer.service';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit 
{

  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  }
  Offers: Offer[];

  constructor(public http: HttpClient, public authService:AuthService, public offerService: OfferService) { }

  ngOnInit() {
      this.offerService.getAllOffers()
      .subscribe((res: any) => { this.Offers = res as Offer[]; });

      this.offerService.getSubject().subscribe((data) => {
        this.Offers = data;
      });
  }

  delete(productCode : String) {
    this.offerService.delete(productCode).subscribe((res: any) => { console.log("Deleted") });
  }

}
