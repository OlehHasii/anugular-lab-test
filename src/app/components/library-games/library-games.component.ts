import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/game.model';

@Component({
  selector: 'app-library-games',
  templateUrl: './library-games.component.html',
  styleUrls: ['./library-games.component.css'],
})
export class LibraryGamesComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  subscribtion: Subscription;
  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.games = this.gamesService.getMyGames();
    this.gamesService.fetchMyGames().subscribe();
    this.subscribtion = this.gamesService.myGamesChanged.subscribe((games) => {
      this.games = games;
    });
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
