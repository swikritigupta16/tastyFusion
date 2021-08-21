import { Component, OnInit } from '@angular/core';
import { DbServiceService } from 'src/app/db-service.service';
import {Cart} from '../../cart';
import Swal from 'sweetalert2';
import { BehaviourSubjectService } from 'src/app/behaviour-subject.service';
import { Items } from 'src/app/items';



@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

 cartDetails:any;
 currentemail:any;
 cartItem:any[] = [];
 cartItemTotalPrice:any;
 totalItems:number = 0;

  constructor(private DbServiceService:DbServiceService,
    private BehaviourSubjectService: BehaviourSubjectService) { }

  ngOnInit(): void {
    this.DbServiceService.getCartDetailsfromServer()
    .subscribe((response:any) => {
      this.cartItem.length = 0;
      this.cartItemTotalPrice = 0;
      this.totalItems = 0;
     
     this.cartDetails = response[0];
     


     this.currentemail = localStorage.getItem("LoggedInUser");
      this.cartItemTotalPrice = this.cartDetails.totalPrice;

      for(let i =0; i<this.cartDetails.items.length; i++){
        this.cartItem[i] = this.cartDetails.items[i];     
        console.log(this.cartItem[i]); 
          this.DbServiceService.getItemDataById(this.cartItem[i]._id)
          .subscribe((ItemResponse:any) =>{            
            this.cartItem[i].imgPath =ItemResponse.imgPath;
            console.log(" this.cartItem[i].imgPath " +  this.cartItem[i].imgPath)    
          })
      }
              for(let x =0; x<this.cartItem.length; x++){
        this.totalItems = this.totalItems + this.cartItem[x].quantity
      }
  });
}

saveItems(){}


clearItems(){}

backToStore(){}

clearCart(){
 
  this.DbServiceService.clearCartDataFromServer()
  .subscribe((response) => {
    Swal.fire({
  icon: 'success',
  title: 'Cart Cleared',
  text:'All the items in the cart has been deleted'  
});
 this.ngOnInit();
})
}


pay(){
  Swal.fire({
    icon: 'info',
    title: 'Payment Info',
    text:'Only Cash on delivery available for now !!'  
  })
}



addToCart(items:Items){
  this.DbServiceService.addItemsToCart(items)
  .subscribe((response) => {console.log(response);   
  // this.BehaviourSubjectService.settotalItems(this.totalItems + 1);
 
  this.ngOnInit();


})

}

deleteFromCart(items:Items){
  this.DbServiceService.deleteFromCart(items)
  .subscribe((response) => this.ngOnInit());
  
}

removeItem(items:Items){
  this.DbServiceService.removeCartItem(items)
  .subscribe((response) => {//alert(response);
    //window.location.reload();
    this.ngOnInit();
  })
  


}
}