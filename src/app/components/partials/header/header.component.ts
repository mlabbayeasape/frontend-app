import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth;
  resume;
  constructor(private auth: AuthService,
              private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(
      (cart:Cart)=>{
        this.resume = cart.resume;
      },
      (error)=>{
        console.log(error);
      }
    )
    this.cartService.emitCart();
    this.auth.isAuth$.subscribe(
      (bool: boolean) => {this.isAuth = bool}
    );
  }

  logout(){
    this.auth.logOut();
  }

}
