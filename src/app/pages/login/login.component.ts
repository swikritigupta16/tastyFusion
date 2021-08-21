import { Component, OnInit } from '@angular/core';
import { DbServiceService } from "../../db-service.service";
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviourSubjectService } from '../../behaviour-subject.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;
  model:any = {};
  Flag:any;
  errorMsg:string;
isErr:boolean;


  constructor(private DbServiceService:DbServiceService, private Router: Router,
    private BehaviourSubjectService: BehaviourSubjectService) { }

  ngOnInit(): void {
    }

  checkLogin(){
    this.DbServiceService.checkLoginFromServer(
      this.model.email,
      this.model.password
    ).subscribe((response: any) => {
      console.log(response);
      this.Flag = response.isAdmin;
      alert(this.Flag);

      localStorage.setItem('isAdmin', this.Flag);
      localStorage.setItem("isLoggedIn", "true");
      if (this.Flag == 'true') {
        this.BehaviourSubjectService.setUser(true);

        localStorage.setItem("LoggedInUser",response.username);

        this.Router.navigate(['/admin-navbar']);
      } else {
        this.BehaviourSubjectService.setUser(false);

        localStorage.setItem("LoggedInUser",response.username);

        localStorage.setItem("LoggedinUserId", response._id);

        this.Router.navigate(['/order']);
      }
      window.location.reload();
    },
    
    (error) =>{
    
      this.errorMsg = 'UserName or Password does not exist';
      this.isErr = true;
       this.BehaviourSubjectService.setIsLoggedIn(false);
    },
    ()=>{
        }
 );
  }

  forgetPassword(){
    Swal.fire({
      icon: 'info',
      title: 'Forgot Password?',
      text:'Contact Us for the assistance!!'  
    })
  }
  


    }