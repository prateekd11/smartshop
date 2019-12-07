import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { product } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service'
import { Product } from '../services/Product';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editComponent : FormBuilder;
   product: product = new product(); 



  editForm: FormGroup = this.formBuilder.group({
    'productCode': new FormControl('',[Validators.required , Validators.maxLength(6)]),
    'productName' : new FormControl('',[Validators.required, Validators.maxLength(200)]),
    'productType' : new FormControl('',[Validators.required]),
    'brand': new FormControl('',[Validators.required]),
    'ratePerQuantity' : new FormControl('',[Validators.required]),
    'stockCount': new FormControl('',[Validators.required]),
    'addDate':new FormControl('',[Validators.required]),
    'aisle' : new FormControl('',[Validators.required]),
    'shelf' : new FormControl('',[Validators.required]),
    'dateOfManf' : new FormControl('',[Validators.required]),
    'dateOfExp' : new FormControl('',[Validators.required]),
    'productImg' : new FormControl('',[Validators.required])
   
   });

  submitted = false;
  saved = false;

  constructor(private formBuilder : FormBuilder , private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params =>{
      this.productService.getProduct(params.get('productCode')).subscribe(
          (f) => {
            if(f != null) {
            this.product = f ;
            console.log(this.product)
            this.editForm = this.formBuilder.group({
              'productCode' : new FormControl(this.product.productCode,[Validators.required , Validators.maxLength(6)]),
              'productName' : new FormControl (this.product.productName,[Validators.required, Validators.maxLength(200)]),
              'productType' : new FormControl(this.product.productType,[Validators.required]),
              'brand' : new FormControl(this.product.brand,[Validators.required]),
              'ratePerQuantity' : new FormControl(this.product.ratePerQuantity,[Validators.required]),
              'stockCount': new FormControl(this.product.stockCount,[Validators.required]),
              'addDate' : new FormControl(this.product.addDate.toString().substring(0,10), [Validators.required,]),
              'aisle' : new FormControl(this.product.aisle,[Validators.required]),
              'shelf' : new FormControl(this.product.shelf,[Validators.required]),
              'dateOfManf' : new FormControl(this.product.dateOfManf.toString().substring(0,10), [Validators.required,]),
              'dateOfExp' : new FormControl(this.product.dateOfExp.toString().substring(0,10), [Validators.required,]),
              'productImg': new FormControl(this.product.productImg,[Validators.required]),  
            })
          } else {
            return;
          }
          })
        });
      }

      get f(){
        return this.editForm.controls;
      }

    onSubmit(){
      let productUpdated: Product = {
        productCode: this.editForm.value['productCode'],
        productName: this.editForm.value['productName'],
        productType:this.editForm.value['productType'],
        brand : this.editForm.value['brand'],
        ratePerQuantity: this.editForm.value['ratePerQuantity'],
        stockCount:this.editForm.value['stockCount'],
        addDate:new Date(this.editForm.value['dateOfMaunfacture']),
        aisle:this.editForm.value['aisle'],
        shelf:this.editForm.value['shelf'],
        dateOfManf:new Date(this.editForm.value['dateOfMaunfacture']),
        dateOfExp:new Date(this.editForm.value['dateOfExp']),
        productImg:this.editForm.value['productImg']
      };

      this.productService.updateProduct(productUpdated)
      this.saved = true;
      console.log(this.editForm.value)
    }
    get productName() { return this.editForm.get('productName');}

    get productType() { return this.editForm.get('productType');}

    get productCode() { return this.editForm.get('productCode');}

    get productImg() { return this.editForm.get('productImg');}

    get brand() { return this.editForm.get('brand');}

    get ratePerQuantity() { return this.editForm.get('ratePerQuantity');}

    get stockCount() { return this.editForm.get('stockCount');}

    get addDate() { return this.editForm.get('addDate');}

    get dateOfManf() { return this.editForm.get('dateOfManf');}

    get dateOfExp() { return this.editForm.get('dateOfExp');}

    get aisle() { return this.editForm.get('aisle');}

    get shelf() { return this.editForm.get('shelf');}

    delete(){
      
      this.productService.delete(this.productCode.value).subscribe((res) => {
        if(res) {
          alert('Product deleted succesfully');
          this.router.navigate(['']);
          console.log('asndlksandlknasd')
        }
      });
      
      //TODO router service above is not working
      
    }
}
