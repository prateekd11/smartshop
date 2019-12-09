import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authenticate/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { OfferComponent } from './offer/offer.component';
import { BillingComponent } from './billing/billing.component';
import { SuperUserComponent } from './super-user/super-user.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    CarouselComponent,
    ProductComponent,
    SearchComponent,
    ItemInfoComponent,
    EditProductComponent,
    PasswordResetComponent,
    EditOfferComponent,
    OfferComponent,
    BillingComponent,
    SuperUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
