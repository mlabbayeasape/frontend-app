import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[];
  productsSub: Subscription;
  userId: string;
  loaded: boolean = false;

  api: string = environment.api

  constructor(private productService: ProductService,
              private auth: AuthService,
              private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.userId = this.auth.userID;
    this.productsSub = this.productService.products$.subscribe(
      (products: Product[])=>{
        this.products = products;
        this.loaded = true;
      },
      (error)=>{
        console.log(error);
        this.loaded = false;
      }
    );
    this.productService.getProducts();
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
    console.log(this.cartService.cart)
  }


  ngOnDestroy():void{
    this.productsSub.unsubscribe();
  }

}
