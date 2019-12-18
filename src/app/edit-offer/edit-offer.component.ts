import { Component, OnInit } from '@angular/core';
import { Offer } from '../Offer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  offer: Offer;
  productCode: string;
  loading:boolean = false;
  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('U001:pwd')
    })
  }
  editOfferForm: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, 
    private productService: ProductService) {
      
      this.editOfferForm = new FormGroup({
        'offerDate' : new FormControl('', [Validators.required]),
        'productCode' : new FormControl('', [Validators.required, Validators.maxLength(6)]),
        'discountedRate' : new FormControl('', [Validators.required]),
        'offerName' : new FormControl('', [Validators.required,Validators.maxLength(200)])
    });
  }

  async ngOnInit() {
    this.loading = true;
    this.route.queryParamMap.subscribe(params => {
      this.productCode = params.get('id');
    });
    if(!(typeof this.productCode === "undefined"))
    {
      
    await this.productService.getOffer(this.productCode)
      .toPromise().then((res: Offer) => { 
        this.loading = false;
        this.offer = res as Offer; 
        
      });
    }
    if(this.offer === null) {
      this.editOfferForm = new FormGroup({
        'offerDate' : new FormControl(null, [Validators.required]),
        'productCode' : new FormControl('', [Validators.required, Validators.maxLength(6)]),
        'discountedRate' : new FormControl('', [Validators.required]),
        'offerName' : new FormControl('', [Validators.required,Validators.maxLength(200)])
    });
    } else {
    this.editOfferForm = new FormGroup({
      'offerDate' : new FormControl(this.offer.offerDate.toString().substring(0,10), [Validators.required]),
      'productCode' : new FormControl(this.offer.productCode, [Validators.required, Validators.maxLength(6)]),
      'discountedRate' : new FormControl(this.offer.discountedRate, [Validators.required]),
      'offerName' : new FormControl(this.offer.offerName, [Validators.required,Validators.maxLength(200)])
  });
}
  }

  editOffer() {
    this.loading = true;
    this.offer = this.editOfferForm.value;
    this.productService.editOffer(this.offer)
      .subscribe((res: any) => { this.loading = false; });
  }

 

}
