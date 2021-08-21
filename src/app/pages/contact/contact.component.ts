import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


 msg(){
   alert("Kindly click on Send Message button and continue writing your query...")
 }


  mail()
    {   
        console.log("111111");
        var mail = document.createElement("a");
        console.log("22222");
        mail.href = "mailto:tasty.fusion@gmail.com?subject=Query&body=start writing your Query....";
        mail.click(); 

    }


}