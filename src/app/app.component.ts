import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './authenticate/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartshop';
  isLoggedIn : boolean = false;
  constructor(public authService: AuthService, private router: Router) {
  }
  /*search(value: string) {
    console.log('value to send ',value);
    this.router.navigate(['/products',{'search':value}]);
  }*/

  search(itemName: string) {
    this.router.navigate(['products'], { queryParams: { 'itemName': itemName } });
  }
}
