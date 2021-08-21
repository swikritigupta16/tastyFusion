import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Items } from './items';
import { Cart } from './cart';
import {BehaviourSubjectService} from './behaviour-subject.service';

@Injectable({
  providedIn: 'root',
})
export class DbServiceService {
  constructor(private http: HttpClient) {}
  apiUrl: any = 'http://localhost:4000/api';

  checkRegisterationServer(model: any) {
    return this.http.post(
      this.apiUrl + '/register',
      { model },
      { responseType: 'text' }
    );
  }

  checkLoginFromServer(email:string,password:string){
    return this.http.post(this.apiUrl + '/check-login', {email, password})
    .pipe(catchError((err) =>{
     
     alert("Wrong Credentials !!! Kindly login again.");
    // console.log(err);
     return throwError(err);
    }))
  

  }

  getItemData(){
    return this.http.get<Items[]>(this.apiUrl + '/getItemData');
  }
  
  updateItems(Items:any){
    let newItem = {i_id: Items.i_id,
      Name: Items.Name, 
      price:Items.price,
      imgPath:Items.imgPath};

    return this.http.put<Items[]>(this.apiUrl + '/updateItems/' + Items._id, {newItem})
  }
  
  createItem(items:any){
    return this.http.post<Items[]>(this.apiUrl + '/createItem', {items});
  }


  deleteItem(_id:any){
    return this.http.delete(this.apiUrl + '/deleteItem/' + _id);
  }



  addItemsToCart(item:Items){
    
    let _id = localStorage.getItem("LoggedinUserId");
    console.log(_id);
    let addedItems = {imgPath:item.imgPath, _id:item._id, Name:item.Name, quantity:1, price:item.price}
  
    return this.http.post(this.apiUrl + '/add-items-to-cart', {_id, addedItems},{responseType:'text'})
  }
  
  getCartDetailsfromServer(){
    let _id = localStorage.getItem("LoggedinUserId");
    return this.http.get<Cart>(this.apiUrl + "/get-cart-details/" + _id);
    
  }
    
  getItemDataById(_id:any){
    return this.http.get<Items[]>(this.apiUrl + '/getItemDataById/' + _id);
  
  }
  
  clearCartDataFromServer(){
     let _id = localStorage.getItem("LoggedinUserId");
    return this.http.delete(this.apiUrl + '/clearCart/' + _id,{responseType:'text'});
  
  }
  
  removeCartItem(item:Items){
     let _id = localStorage.getItem("LoggedinUserId");
     let itemToDel = item;
    return this.http.post(this.apiUrl + '/delete-item',{_id, itemToDel},{responseType:'text'});  
  }
  
  deleteFromCart(item:Items){
     let _id = localStorage.getItem("LoggedinUserId");
     let itemToDecrement = item;
  
     return this.http.post(this.apiUrl + '/decrease-item',{_id, itemToDecrement},{responseType:'text'});  
  
  }
  
  }
  
   



