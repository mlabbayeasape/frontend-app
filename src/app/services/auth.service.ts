import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;
  token: string;
  userID: string;
  isAuth$ = new BehaviorSubject<boolean> (false);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string){
      return new Promise(
        (resolve, reject)=> {
        this.http.post(this.api+'users/signup', {email: email, password: password})
        .subscribe(
          (signUpData: {status: number, message: string}) => {
            // authentifier utilisateur
            if(signUpData.status === 201){
              this.signIn(email,password)
              .then(()=>{
                resolve(true);
              })
              .catch((error) => {
                reject(error);
              });
            }else{
              reject(signUpData.message);
            }

          },
          (error) => {
            reject(error)
          }
        )
      }
      )
  }

  signIn(email: string, password: string){
      return new Promise(
        (resolve, reject)=> {
          this.http.post(this.api+'users/login',{email: email, password: password})
          .subscribe(
            (authData: {token: string, userId: string}) => {
                this.token = authData.token;
                this.userID = authData.userId;
                this.isAuth$.next(true);
                resolve(true);
            },
            (error) => {
              reject(error)
            }
          )
        }
      )
  }

  logOut():void{
    this.isAuth$.next(false);
    this.userID = null;
    this.token = null;
  }

}
