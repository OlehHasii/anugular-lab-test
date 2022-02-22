import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: Game[] /* = [
    new Game(
      'Doom',
      200,
      'Hell`s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
      'Action'
    ),
    new Game(
      'Doom',
      200,
      'Hell`s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
      'Action'
    ),
    new Game(
      'Doom',
      200,
      'Hell`s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
      'Action'
    ),
    new Game(
      'Doom',
      200,
      'Hell`s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
      'Action'
    ),
  ] */;
  value: number = 70;
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.fetchGames().subscribe((response) => {
      this.games = response;
    });
  }
}
