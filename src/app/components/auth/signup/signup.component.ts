import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
    ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null,Validators.required]
    });
  }

  onSubmit():void{
    this.loading = true;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.auth.signUp(email,password)
    .then(()=>{
      this.loading = false;
      this.router.navigate(['/shop']);
    })
    .catch((error)=>{this.loading = false;this.errorMessage = error.message})
  }


}
