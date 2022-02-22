import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { Game } from '../shared/game.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  user = JSON.parse(sessionStorage.getItem('userData'));
  games: Game[] = [];
  myGames: Game[] = [];
  myGamesChanged = new Subject<Game[]>();
  constructor(private http: HttpClient) {}

  fetchGames() {
    return this.http
      .get<Game[]>(
        'https://angular-lab-final-default-rtdb.europe-west1.firebasedatabase.app/Games.json'
      )
      .pipe(
        tap((games) => {
          this.games = games;
        })
      );
  }
  getMyGames() {
    return this.myGames.slice();
  }

  addGame(game: Game) {
    this.myGames.push(game);
    this.http
      .put(
        `https://angular-lab-final-default-rtdb.europe-west1.firebasedatabase.app/myGames_${this.user.id}.json`,
        this.myGames
      )
      .subscribe();

    this.myGamesChanged.next(this.myGames.slice());
  }
  fetchMyGames() {
    return this.http
      .get<Game[]>(
        `https://angular-lab-final-default-rtdb.europe-west1.firebasedatabase.app/myGames_${this.user.id}.json`
      )
      .pipe(
        tap((games) => {
          if (!games) {
            this.myGames = [];
          } else {
            this.myGames = games;
          }
          this.myGamesChanged.next(this.myGames.slice());
        })
      );
  }
}
