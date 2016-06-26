import games from './games';
import templates from './templates';

export class Curate {
  constructor() {
    this.games = games;
    this.selectedGames = [];
  }

  generateCuration() {
    var page = window.open("about:blank");
    page.document.write(templates.raw({games: this.selectedGames}));
  }
}
