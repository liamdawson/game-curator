export class App {
  configureRouter(config, router) {
    config.title = 'Game Curator';
    config.map([
      {
        route: ['', 'curate'],
        name: 'curate',
        moduleId: './curate',
        nav: true,
        title: 'Curate'
      },
      {
        route: 'new-game',
        name: 'new-game',
        moduleId: './new-game',
        nav: true,
        title: 'Add a Game'
      }
    ]);

    this.router = router;
  }
}
