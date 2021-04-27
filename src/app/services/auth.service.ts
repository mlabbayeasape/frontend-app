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

  constructor(private http: HttpClient) {
    this.initAuth();
  }

  initAuth(){
    if(typeof localStorage !== "undefined"){
      const data = JSON.parse(localStorage.getItem('auth'));
      if(data){
        if(data.userId && data.token){
          this.userID = data.userID;
          this.token = data.token;
          this.isAuth$.next(true);
          console.log("isAuth=",this.isAuth$);
        }
      }
    }
  }

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
                //Sauvegarde AuthData en local
                if(typeof localStorage !== "undefined"){
                  localStorage.setItem('auth',JSON.stringify(authData));
                }
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
    if (typeof localStorage !== "undefined"){
      localStorage.setItem('auth',null);
    }
  }

}
