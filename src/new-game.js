import {DialogService} from 'aurelia-dialog';

export class NewGame {
  static inject = [DialogService];

  game;
  numericScale;
  dialogService;

  constructor(dialogService) {
    this.dialogService = dialogService;

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

  saveGame() {
    this.dialogService.open({
      viewModel: 'generate-game',
      model: this.game
    });
  }
}
