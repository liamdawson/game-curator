import {DialogService} from 'aurelia-dialog';
import games from './games';

export class NewGame {
  static inject = [DialogService];

  games;
  game;
  numericScale;
  dialogService;
  selectedExistingGame;

  constructor(dialogService) {
    this.dialogService = dialogService;
    this.games = games;

    this.numericScale = [1, 2, 3, 4, 5];
    this.game = {
      title: "",
      abstract: "",
      time: '3',
      players: {
        ideal: {
          min: '3',
          max: '7'
        },
        possible: {
          min: '2',
          max: '7'
        }
      },
      difficulty: {
        strategy: '3',
        rules: '3'
      },
      description: ""
    };
  }

  loadExisting() {
    this.game = {...this.selectedExistingGame};
  }

  saveGame() {
    this.dialogService.open({
      viewModel: 'generate-game',
      model: this.game
    });
  }
}
