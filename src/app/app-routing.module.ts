import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { LoginComponent } from './authenticate/login/login.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { AuthGuardService } from './auth-guard.service';
import { EditComponent } from './edit/edit.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'products', component:ProductComponent},
  {path:'offers', component:LoginComponent},
  {path:'search', component:SearchComponent},
  {path:'edit', component:EditComponent, canActivate:[AuthGuardService]},
  {path:'reset-password', component:PasswordResetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
