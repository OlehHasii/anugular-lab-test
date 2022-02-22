import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = new BehaviorSubject<User>(null);
  userEmail: string = '';
  userData: User;

  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  sigup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCnesAo9N-APpT24ac6DA7ujVOo6O9lU3A',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnesAo9N-APpT24ac6DA7ujVOo6O9lU3A',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDate =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDate);
    }
  }

  logout() {
    this.user.next(null);
    sessionStorage.clear();
    console.log(sessionStorage.getItem('user'));

    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.userData = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // function to create a new User
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    sessionStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
    this.userEmail = email;

    this.userData = user;
  }

  //Handling errors when user sign in or sign up
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled.';
        break;
      default:
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
