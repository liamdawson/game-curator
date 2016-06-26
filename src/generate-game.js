import {DialogController} from 'aurelia-dialog';

export class GenerateGame {
  static inject = [DialogController];

  game;

  constructor(controller) {
    this.controller = controller;
  }
  activate(game) {
    this.game = game;
  }

}
