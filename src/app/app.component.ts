import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-lab-final';
  isLogged = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.user.subscribe((user) => {
      // this.isLogged = !user ? false : true;
      this.isLogged = !JSON.parse(sessionStorage.getItem('user'))
        ? false
        : true;
    });
  }

  ngOnDestroy(): void {
    //this.userSub.unsubscribe();
  }
}
