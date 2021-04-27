import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.token;
    const newrequest = request.clone({
      //on modifie l'ancienne requete pour inserer le token
      headers: request.headers.set('Authorization','Bearer '+token)
    })
    return next.handle(newrequest);
  }
}
