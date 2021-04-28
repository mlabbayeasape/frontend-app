import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;
  items: Item[];

  constructor(private cartService: CartService,

    ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(
      (cart:Cart)=>{
        this.cart = cart;
        this.items = cart.items

      }
    )
    this.cartService.emitCart();
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
  removeOne(product: Product){
    this.cartService.removeOne(product);
  }
  removeMany(product: Product){
    this.cartService.removeMany(product);
  }

}
