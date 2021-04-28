
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { Product } from '../models/product';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = new Cart();
  cart$ = new Subject<Cart>();
  tva = environment.tva/100


  constructor() {
    this.initCart();
  }


  initCart():void{
    if(typeof(localStorage) !== "undefined"){
      const cart = JSON.parse(localStorage.getItem('cart'));
      console.log("cart=",cart);
      this.cart = cart ? cart : null;
    } else {
      this.cart = null;
    }
  }



  emitCart(){
    this.cart$.next(this.cart)
  }

  addToCart(product: Product){
    const item = this.cart.items.find(item => item.product._id === product._id);

    if(item){ // si un item existe déjà dans le panier
      item.quantity++
    }else{ // n'existe pas encore dans le panier
      const item = new Item();
      item.product = product;
      item.quantity = 1;
      this.cart.items.push(item);
    }
    this.updateCart();

  }

  updateCart(){
    this.cart.resume = {quantity:0, costHT:0, costTaxe:0, costTTC:0};
    this.cart.items.forEach(item => {
      this.cart.resume.quantity += item.quantity;
      this.cart.resume.costHT += item.quantity * item.product.price;
      this.cart.resume.costTaxe += this.cart.resume.costHT * this.tva;
      this.cart.resume.costTTC += this.cart.resume.costHT * (1 + this.tva);
    })
    if(typeof(localStorage) !== "undefined"){
      localStorage.setItem('cart',JSON.stringify(this.cart));
    }
    this.emitCart();
  }

  removeOne(product){
    const item = this.cart.items.find(item => item.product._id === product._id);
    if(item){
      if(item.quantity > 1){
        item.quantity--;
      }else{
        const index = this.cart.items.indexOf(item);
        this.cart.items.splice(index,1);
      }
      this.updateCart();
    }
  }

  removeMany(product: Product){
    const item = this.cart.items.find(item => item.product._id === product._id);
    if(item){
      const index = this.cart.items.indexOf(item);
      this.cart.items.splice(index,1);
      this.updateCart();
    }
  }

}
