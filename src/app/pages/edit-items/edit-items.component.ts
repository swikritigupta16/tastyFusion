import { Component, OnInit } from '@angular/core';
import { DbServiceService } from "../../db-service.service";
import { Items } from '../../items';

declare var $: any; 
@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.css']
})
export class EditItemsComponent implements OnInit {
  items:Items[] = [];
  item:any;
  itemModel:any = {};
  isEditable:boolean = false;
  isAddedNew:boolean = false;
  img_name:any;
  url:any;
  model:any = {};
  constructor(private DbServiceService: DbServiceService) { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();


    this.DbServiceService.getItemData()
    .subscribe(response => {this.items = response;
      console.log(this.items)});
  }

  setEditState(items:any, state:any){
    items.isEditable = state;  
    
  }

  update(items:Items){
    this.DbServiceService.updateItems(items)
    .subscribe((response) =>{this.items = response;
    })
  }

  createNew(){
    this.isAddedNew = true;

  }

  create(){
    this.DbServiceService.createItem(this.itemModel)
    .subscribe(items => {this.items = items;
      this.isAddedNew = false})
  }

  setAddedState(){
    this.isAddedNew = false;
    this.itemModel = {};
  }

  readUrlEdit(event:any, item:Items) {
    console.log(item);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      
      var str = item.imgPath;
      var splitted = str.split("\\"); 
      alert(splitted[2]);
      item.imgPath = splitted[2];
      alert(item.imgPath);
    }
  }
  
  readUrlAdd(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      
      var str = this.itemModel.imgPath;
      var splitted = str.split("\\"); 
      alert(splitted[2]);
      this.itemModel.imgPath = splitted[2];
      alert(this.itemModel.imgPath);
    }
  }
  


  delete(item:Items){   
    
    this.DbServiceService.deleteItem(item._id)
    .subscribe((data:any) => {
      console.log(data);
                for(var i=0;i<this.items.length;i++){
            if(this.items[i].text == item.text){
              this.items.splice(i,1);
            }
          }
    })
    

    

  } 


  

}