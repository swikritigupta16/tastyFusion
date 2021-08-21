import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../../db-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any = {};

  constructor(private DbServiceService: DbServiceService, private act: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
  }
  createAccount(){
    this.DbServiceService.checkRegisterationServer(this.model)
    .subscribe((response:any) =>{
      if(response == "success"){
        this.route.navigate(['/login']);
      }
      else{
        
      }
    });
  }}



