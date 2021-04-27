import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
