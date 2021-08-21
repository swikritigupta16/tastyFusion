import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DbServiceService } from 'src/app/db-service.service';
import { Items } from '../../items';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  items:Items[] = [];
  errorMessage:string;
  
  constructor(private DbServiceService:DbServiceService, private Router: Router) { }

  ngOnInit(): void {

    this.DbServiceService.getItemData().subscribe(
      (response:any) => this.items = response,
      (error:any) => alert(error)
    );

  }

  addToCart(items:Items){
    Swal.fire({
      icon: 'success',
      title: 'Item added to cart',
      text:''  
    })
          this.DbServiceService.addItemsToCart(items)
        .subscribe((response:any) => {console.log(response);
    
    })
        }
    
  }

