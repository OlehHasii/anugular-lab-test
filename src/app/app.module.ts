import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

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

const AppRoutes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'games', component: GamesComponent },
  { path: 'library', component: LibraryGamesComponent },
  { path: 'friends', component: FriendsComponent },
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
