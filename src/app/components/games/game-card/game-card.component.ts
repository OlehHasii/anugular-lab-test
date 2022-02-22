import { Component, Input, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/game.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input() game: Game;
  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {}

  onAddGame(game: Game) {
    this.gamesService.addGame(game);
  }
}
