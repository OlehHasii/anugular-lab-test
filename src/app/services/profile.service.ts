import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, take, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  saveProfile(profileData: Object) {
    // Save profile data
    return this.loginService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.put(
          `https://angular-lab-final-default-rtdb.europe-west1.firebasedatabase.app/profileData${user.id}.json`,
          profileData,
          { params: new HttpParams().set('auth', user.token) }
        );
      })
    );
  }
  getProfile() {
    /* return this.loginService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http
          .get(
            `https://angular-lab-final-default-rtdb.europe-west1.firebasedatabase.app/profileData${user.id}.json`,
            { params: new HttpParams().set('auth', user.token) }
          )
          .pipe(
            catchError((error) => {
              return throwError(() => new Error('user dont have any data'));
            })
          );
      })
    ); */
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    return this.http.get(
      `https://angular-lab-final-default-rtdb.europe-west1.firebasedatabase.app/profileData${user.id}.json`,
      { params: new HttpParams().set('auth', user._token) }
    );
  }
}
