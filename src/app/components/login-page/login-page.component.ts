import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginMode = true;
  isLoading = false;
  error: string = '';

  loginForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    ),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSignUpMode() {
    this.loginMode = false;
  }
  onSignInMode() {
    this.loginMode = true;
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.loginMode) {
      authObs = this.loginService.login(email, password);
    } else {
      authObs = this.loginService.sigup(email, password);
    }

    authObs.subscribe({
      next: (event) => {
        this.isLoading = false;
        this.router.navigate(['./profile']);
      },
      error: (errorRes) => {
        this.error = errorRes.message;
        this.isLoading = false;
      },
    });

    this.loginForm.reset();
  }

  ngOnDestroy(): void {}
}
