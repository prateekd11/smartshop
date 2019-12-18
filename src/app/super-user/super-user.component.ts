import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { managers } from './managers';
import { environment } from 'src/environments/environment';
import { SuperUserService } from '../super-user.service';

@Component({
  selector: 'app-super-user',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.css']
})
export class SuperUserComponent implements OnInit {

  constructor(private http: HttpClient, private superUserService: SuperUserService) { }
  
  managerPending : managers[];
  manager :managers[];


  ngOnInit() {
    
    this.superUserService.getAllApproved()
    .subscribe((res:  managers[]) => { this.manager = res as managers[];} );
    
    this.superUserService.getAllPending()
    .subscribe((obj:  managers[]) => { this.managerPending = obj as managers[];  }  );  

    this.superUserService.approvedManagers$.subscribe((approved) => {
      this.manager = approved;
    })

    this.superUserService.pendingManagers$.subscribe((pending) => {
      this.managerPending = pending;
    })
  }

  accessChangeEvent(userId : string) {
    this.superUserService.updateAccess(userId);
  }

}
