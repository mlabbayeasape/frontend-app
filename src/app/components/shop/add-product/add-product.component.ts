import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  imagePreview: string;
  userID: string;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private productService: ProductService,
              private router: Router,
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name:         [null,Validators.required],
      description:  [null,Validators.required],
      stock:        [1,Validators.required],
      price:        [0,Validators.required],
      image:        [null,Validators.required],
    });
    this.userID = this.auth.userID;


  }

  onSubmit():void{
    this.loading = true;
    const product = new Product();
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value * 100;
    product.stock = this.productForm.get('stock').value;
    product.image = '';
    product.userId = this.userID;
        // save product
        this.productService.createNewProduct(product, this.productForm.get('image').value)
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
