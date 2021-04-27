import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
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

  api: string = environment.api

  constructor(private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.productsSub = this.productService.products$.subscribe(
      (products: Product[])=>{
        this.products = products;
      },
      (error)=>{
        console.log(error);
      }
    );
    this.productService.getProducts();
  }


  ngOnDestroy():void{
    this.productsSub.unsubscribe();
  }

}
