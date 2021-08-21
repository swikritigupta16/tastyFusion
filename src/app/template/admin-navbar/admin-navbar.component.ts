import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviourSubjectService } from '../../behaviour-subject.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  isAdmin: boolean = false;
  Flag: any;
  isLoggedIn:boolean;
 LoggedInUser:string = "";


  constructor(private Router: Router,
    private BehaviourSubjectService: BehaviourSubjectService) { }

    ngOnInit() {
    }
  
    logout(){
      localStorage.removeItem("LoggedInUser");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isLoggedIn");
     /*this.BehaviourSubjectService.setIsLoggedIn(false);
     this.BehaviourSubjectService.setUserName("");*/
     this.BehaviourSubjectService.setUser(false);
     this.Router.navigate(['/login']);
 
   }
 
  
}