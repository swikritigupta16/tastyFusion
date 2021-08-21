import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviourSubjectService} from './behaviour-subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'training-project';
  isAdmin:boolean = false;
  Flag:any;
  
  sidenav:any;

  data:string = "Data to be displayed";
  applied = true;
  
  


  constructor(private Router:Router, private BehaviourSubjectService:BehaviourSubjectService){}


  ngOnInit(){
    this.BehaviourSubjectService.TelecastUser.subscribe((isAdmin) => {        
        console.log(isAdmin);
        this.isAdmin = isAdmin;
       });
 
   this.Flag = localStorage.getItem("isAdmin");
 
   if(this.Flag == "true"){
     this.isAdmin = true;
     this.Router.navigate(['/home'])
   }
   else{
     this.isAdmin = false;
   }
      
 }
 

}