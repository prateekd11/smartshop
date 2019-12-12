import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Offer } from '../Offer';
import { AuthService } from '../authenticate/auth.service';
import { OfferService } from '../offer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit 
{

  loading:boolean = false;
  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  }
  Offers: Offer[];

  constructor(public http: HttpClient, public authService:AuthService, public offerService: OfferService
    ,private router: Router) { }

  ngOnInit() {
      this.loading = true;
      this.offerService.getAllOffers()
      .toPromise().then((res: any) => { 
        this.loading = false;
        this.Offers = res as Offer[];
      this.offerService.subject.next(res) });

      this.offerService.updatedList$.subscribe((data) => {
        this.Offers = data;
      });
  }

  delete(productCode : String) {
    this.loading = true;
    this.offerService.delete(productCode);
    this.loading = false;
    this.router.navigate(['/offers'])
  }

}
