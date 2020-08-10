import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location,LocationStrategy, PathLocationStrategy } from '@angular/common';

import {products} from '../products';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ProductDetailsComponent implements OnInit {

  product;

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.product = products[+params.get('productId')];
    })
  }
  goBack(){
    this.location.back();
  }
  
  //cart operations

  addToCart(product){
    this.cartService.addToCart(product);
    window.alert('Your product ' + product.name + ' has been added to the cart!');

  }

  getCart(){
    return this.cartService.getItems();
  }
}