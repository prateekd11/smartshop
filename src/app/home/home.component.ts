import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss']
})
export class HomeComponent implements OnInit {

  items = [
    {id:1, imageUrl: "https://images.unsplash.com/photo-1416339698674-4f118dd3388b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
     name:"Clothing" },
    {id:2, imageUrl:"https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
     name:"Men"}];
  constructor() { }

  ngOnInit() {
  }

}
