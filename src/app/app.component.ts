import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './authenticate/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('itemName',null) itemName: ElementRef;
  isLoggedIn : boolean = false;
  validSearch:boolean = false;
  constructor(public authService: AuthService, private router: Router) {
  }

  search(itemName: HTMLInputElement) {
    let searchName = itemName.value;
    this.itemName.nativeElement.value='';
    if(searchName === '' || searchName == null){
      return;
    }
    this.router.navigate(['products'], { queryParams: { 'itemName': searchName } });
  }
}
