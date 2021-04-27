import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null,Validators.required]
    });
  }

  onSubmit():void{
    this.loading = true;
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.auth.signIn(email,password)
    .then(()=>{
      this.loading = false;
      this.router.navigate(['/shop']);
    })
    .catch((error)=>{this.loading = false; this.errorMessage = error.message})
  }

}
