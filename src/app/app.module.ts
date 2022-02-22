import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatSliderModule } from '@angular/material/slider';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GamesComponent } from './components/games/games.component';
import { FriendsComponent } from './components/friends/friends.component';
import { LibraryGamesComponent } from './components/library-games/library-games.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GameCardComponent } from './components/games/game-card/game-card.component';
import { FriendItemComponent } from './components/friend-item/friend-item.component';

const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuardService] },
  {
    path: 'library',
    component: LibraryGamesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'friends',
    component: FriendsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    GamesComponent,
    FriendsComponent,
    LibraryGamesComponent,
    ProfileComponent,
    LoadingSpinner,
    GameCardComponent,
    FriendItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSliderModule,
    MatSliderModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
