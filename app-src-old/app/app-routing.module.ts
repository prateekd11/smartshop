import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authenticate/signup/signup.component';
import { LoginComponent } from './authenticate/login/login.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:SignupComponent},
  {path:'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
