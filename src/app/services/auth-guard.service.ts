import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.loginService.user.pipe(
      take(1), // To avoid running the guard when user emits a new value
      map((user) => {
        let isAuth = !!user;
        /* if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/login']); */
        if (state.url === '/login') {
          if (isAuth) return this.router.createUrlTree(['/games']);
          return true;
        }
        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
