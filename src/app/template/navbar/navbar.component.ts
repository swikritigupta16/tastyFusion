import { Component, OnInit } from '@angular/core';
import {BehaviourSubjectService} from '../../behaviour-subject.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn:boolean;
LoggedInUser:string = "";

  constructor(private BehaviourSubjectService: BehaviourSubjectService,
    private Router: Router
  ) { }

  ngOnInit(): void {
    this.BehaviourSubjectService.TelecastisLoggedIn.subscribe((isLoggedIn) =>
    this.isLoggedIn = isLoggedIn);

      if(localStorage.getItem("isLoggedIn") == "true")
      this.isLoggedIn = true;

    this.BehaviourSubjectService.TelecastLoggedInUser.subscribe((LoggedInUser) =>
    this.LoggedInUser = LoggedInUser);
     this.LoggedInUser =  localStorage.getItem("LoggedInUser"); 
     

  }

  logout(){
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("LoggedinUserId");
    localStorage.removeItem("isLoggedIn");
    this.BehaviourSubjectService.setIsLoggedIn(false);
    this.BehaviourSubjectService.setUserName("");
     this.BehaviourSubjectService.setUser(false);
    this.Router.navigate(['/login']);

  }



}