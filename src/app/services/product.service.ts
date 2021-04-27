import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = environment.api+'/';
  products: Product[];
  products$ = new Subject<Product[]>();


  constructor(private http: HttpClient,

  ) { }

  emitProducts(){
    this.products$.next(this.products)
  }

  getProducts(){
    this.http.get(this.api+'products').subscribe(
      (data: Data) => {
        if(data.status === 200){
          this.products = data.result;
          this.emitProducts();
        }else{
          console.log(data);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getProductById(id:string){
    return new Promise((resolve,reject)=>{
      this.http.get(this.api+'products/'+id).subscribe(
        (data: Data) => {
          if(data.status == 200){
            resolve(data.result)
          }else{
            reject(data.message);
          }
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  createNewProduct(product: Product, image: File){
    return new Promise((resolve,reject)=> {
      let productData: FormData = new FormData();
      productData.append('product',JSON.stringify(product));
      productData.append('image',image);
      this.http.post(this.api+'products',productData).subscribe(
        (data:Data) => {
          if(data.status == 201){
            this.getProducts();
            resolve(data);
          }else{
            reject(data.message)
          }
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  updateProduct(id: string, product: Product, image: File | string){
    return new Promise((resolve,reject) => {
      let productData: FormData = new FormData();
      if(typeof image === 'string'){
        product.image = image;
      }else{
        productData.append('image',image);
      }
      productData.append('product',JSON.stringify(product));
      this.http.put(this.api+'product/'+id, productData).subscribe(
        (data: Data) => {
          if(data.status == 200){

            resolve(data);
          }else{
            reject(data.message);
          }
        },
        (error)=>{
          reject(error);
        }
      )
    })
  }

  deleteProduct(id: string){
    return new Promise((resolve,reject)=>{
      this.http.delete(this.api+'products/'+id).subscribe(
        ()=>{
          this.getProducts();
          resolve(true);
        },
        (error)=>{
          reject(error)
        }
      )
    })
  }

}
