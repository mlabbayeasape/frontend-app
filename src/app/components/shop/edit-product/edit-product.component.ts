import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  idProduct: string;
  product: Product;
  productForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  imagePreview: string;
  userID: string;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        const id = params.id;
        this.productService.getProductById(id)
        .then(
          (product: Product)=>{
            this.product = product;
            console.log("id="+this.product._id)
            this.initForm();
          }
        )
        .catch((error)=>{
          this.router.navigate(['/not-found'])
          console.log(error);
        })
      }
    )

  }


  initForm():void{
    this.productForm = this.formBuilder.group({
      name:         [this.product.name,Validators.required],
      description:  [this.product.description,Validators.required],
      stock:        [this.product.stock,Validators.required],
      price:        [this.product.price,Validators.required],
      image:        [this.product.image,Validators.required],
    });
    this.userID = this.auth.userID;
    this.imagePreview = this.product.image
  }


  onSubmit():void{
    this.loading = true;
    const product = new Product();
    product._id = this.product._id;
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value * 100;
    product.stock = this.productForm.get('stock').value;
    product.image = '';
    product.userId = this.userID;

        // save product

        this.productService.updateProduct(this.product._id,product, this.productForm.get('image').value)
        .then(
          ()=>{
            this.productForm.reset();
            this.loading = false;
            this.router.navigate(['/shop']);
          }
        )
        .catch(
          (error)=>{
            this.loading = false;
            this.errorMessage = error.message;
          }
        );
  }

  onImagePick(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.get('image').patchValue(file);
    this.productForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = ()=>{
      if(this.productForm.get('image').valid){
        this.imagePreview = reader.result as string;
      }else{
        this.imagePreview = null;
      }
    }
    reader.readAsDataURL(file);

  }


}
