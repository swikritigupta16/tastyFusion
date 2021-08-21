import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DbServiceService } from 'src/app/db-service.service';
import { Items } from '../../items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  imgSrc:string="";
  imgSrcArray:any = [];


  items:Items[] = [];
  errorMessage:string;
  
  constructor(private DbServiceService:DbServiceService, private Router: Router) { 
   this.imgSrcArray = ["../assets/img/s1.jpg",
    "../assets/img/s2.jpg",
    "../assets/img/s3.jpg",
    "../assets/img/s4.jpeg",
    "../assets/img/s7.jpeg",
    "../assets/img/s8.jpeg"]  
  }

  ngOnInit(): void {

    this.imgSrc = this.imgSrcArray[0];
    let i = 1;
    setInterval(()=> {
      this.imgSrc = this.imgSrcArray[i];
      i++;

      if(i==6)
      i = 0;
    }, 3000); 





    this.DbServiceService.getItemData().subscribe(
      (response:any) => this.items = response,
      (error:any) => alert(error)
    );

  }

 



}