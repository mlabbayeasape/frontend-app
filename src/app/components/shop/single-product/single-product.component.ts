import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
    ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.route.params.subscribe(
      (params: Params)=>{
        const id = params.id;
        this.productService.getProductById(id)
        .then(
          (product: Product)=>{
            this.product = product;
          }
        )
        .catch((error)=>{
          this.router.navigate(['/not-found'])
          console.log(error);
        })
      }
    )
  }

}
