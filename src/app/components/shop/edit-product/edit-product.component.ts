import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  imagePreview: string;
  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private productService: ProductService,
    private router: Router,) { }

  ngOnInit(): void {
  }

}
