import { Component, ViewChild, Input } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({selector: 'ngbd-carousel-pause', templateUrl: './carousel.component.html'})
export class CarouselComponent {
 
 @Input('category') category:string;
  images:any;
  clothing =  [{id:1, imageUrl: "./assets/Clothing3.jpg",name:"Clothing" },
              {id:2, imageUrl:"./assets/Clothing1.jpg" ,name:"Men"},
              {id: 3, imageUrl: "./assets/Clothing2.jpg", name: "Women"},
              {id: 4, imageUrl:"./assets/Clothing4.jpg" , name:"Children"}];

  electronics = [{id:1, imageUrl: "./assets/Electronics1.jpg",name:"Fit bands" },
                {id:2, imageUrl:"./assets/Electronics2.jpg" ,name:"Laptops"},
                {id: 3, imageUrl: "./assets/Electronics3.jpg", name: "Headphones"},
                {id: 4, imageUrl:"./assets/Electronics4.jpg" , name:"Phones"}];

  footwear =    [{id:1, imageUrl: "./assets/Footwear1.jpg",name:"Women" },
                {id:2, imageUrl:"./assets/Footwear2.jpg" ,name:"Men"},
                {id: 3, imageUrl: "./assets/Footwear3.jpg", name: "Sport shoes"},
                {id: 4, imageUrl:"./assets/Footwear4.jpg" , name:"Casuals"}];

  food =        [{id:1, imageUrl: "./assets/Food1.jpg",name:"Bakery" },
                {id:2, imageUrl:"./assets/Food2.jpg" ,name:"Fast Food"},
                {id: 3, imageUrl: "./assets/Food3.jpg", name: "Vegetables"},
                {id: 4, imageUrl:"./assets/Food4.jpg" , name:"Fruits"}];
                

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  ngOnInit() {
    if(this.category === 'clothing')
      this.images = this.clothing;
    else if (this.category === 'food')
      this.images = this.food;
    else if(this.category === 'footwear')
      this.images = this.footwear;
    else 
      this.images = this.electronics;
  }

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
}