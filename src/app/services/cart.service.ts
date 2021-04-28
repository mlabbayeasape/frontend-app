
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart = new Cart();
  tva = environment.tva


  constructor() { }

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
  }

  removeOne(product){

  }

  removeMany(product: Product){

  }

}
