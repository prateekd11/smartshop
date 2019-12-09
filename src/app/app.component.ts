import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './authenticate/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn : boolean = false;
  constructor(public authService: AuthService, private router: Router) {
  }

  search(itemName: string) {

    this.router.navigate(['products'], { queryParams: { 'itemName': itemName } });
  }
}
