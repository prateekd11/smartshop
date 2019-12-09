import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { managers } from './managers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-super-user',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.css']
})
export class SuperUserComponent implements OnInit {

  constructor(private http: HttpClient) { }
  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('prateekd11:prateekd11')
    })
  }
  managerPending : managers[];
  manager :managers[];


  ngOnInit() {
    this.http.get(`${environment.baseUrl}/users/managers/approved`, this.userAuthCredential)
      .subscribe((res:  managers[]) => { this.manager = res as managers[];} );
    
    this.http.get(`${environment.baseUrl}/users/managers/pending`, this.userAuthCredential)
     .subscribe((obj:  managers[]) => { this.managerPending = obj as managers[];  }  );  
  }

  accessChangeEvent(UserId : string) {
    this.http.put(`${environment.baseUrl}/users/managers/${UserId}`,null,this.userAuthCredential)
    .subscribe( (res) => console.log("changed"));
  }

}
