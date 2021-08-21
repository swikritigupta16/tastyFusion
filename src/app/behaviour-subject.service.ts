import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectService {
  public User = new BehaviorSubject<boolean>(false);
  TelecastUser = this.User.asObservable();

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  TelecastisLoggedIn = this.isLoggedIn.asObservable();
  
  public LoggedInUser = new BehaviorSubject<string>('');
  TelecastLoggedInUser = this.LoggedInUser.asObservable();
    
  constructor() { }

  setUser(isAdmin: boolean) {  
  
    this.User.next(isAdmin); //it is publishing this value to all the subscribers that have already subscribed to this message
}

setIsLoggedIn(isLoggedIn:any){
  this.isLoggedIn.next(isLoggedIn);
}

setUserName(LoggedInUser:string){
  this.LoggedInUser.next(LoggedInUser);
}

}