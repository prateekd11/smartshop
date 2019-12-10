import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import { managers } from './super-user/managers';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {

  private baseUrl: string = environment.baseUrl;
  private userAuthCredential = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('prateekd11:prateekd11')
    })
  }
  private approvedManagers: BehaviorSubject<managers[]> = new BehaviorSubject<managers[]>([]);
  private pendingManagers: BehaviorSubject<managers[]> = new BehaviorSubject<managers[]>([]);
  approvedManagers$: Observable<managers[]> = this.approvedManagers.asObservable();
  pendingManagers$: Observable<managers[]> = this.pendingManagers.asObservable();

  constructor(private http: HttpClient) { }

  getAllApproved() {
    return this.http.get<managers[]>(this.baseUrl+'/users/managers/approved', this.userAuthCredential)
  }

  getAllPending() {
    return this.http.get<managers[]>(this.baseUrl+'/users/managers/pending', this.userAuthCredential)
  }

  updateAccess(userId: string) {
    this.http.put(this.baseUrl+'/users/managers/'+userId,null,this.userAuthCredential)
    .toPromise().then((res) =>{
      this.getAllApproved().toPromise().then((approved) =>{
        this.approvedManagers.next(approved);
      });

      this.getAllPending().toPromise().then((pending) =>{
        this.pendingManagers.next(pending);
      });
    })
  }
}

