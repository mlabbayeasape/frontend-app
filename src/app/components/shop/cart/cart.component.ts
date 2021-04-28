import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;
  items: Item[];
  resume: {quantity:number,costHT:number, costTaxe: number, costTTC:number};
  constructor(private cartService: CartService,

    ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.items = this.cartService.cart.items;
    this.resume = this.cartService.cart.resume;
  }

}
