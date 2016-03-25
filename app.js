const Koa = require('koa'),
      Router = require('koa-router'),
      KoaJade = require('koa-jade'),
      fs = require('fs-promise'),
      path = require('path'),
      gameMatterDir = "game_matter";

var app = new Koa();
var jadeware = new KoaJade({
  viewPath: "./views",
  debug: true,
  pretty: true,
  noCache: true,
  app: app
});

fs.readdir(gameMatterDir).then((files) => files.map((file) => fs.readJson(path.join(gameMatterDir, file)).then((obj) => obj)), (err) => {
  console.error(`Couldn't load game matter files:\n${err.message}`);
  process.exit(1);
}).then((gamePromises) => {
  Promise.all(gamePromises).then((games) => {
    runServer(games);
  }, (err) => {
    console.error(`Couldn't load a game matter file:\n${err.message}`);
    process.exit(2);
  });
});

function runServer(games) {
  jadeware.locals.games = games;

  app.use(new Router().get('/', function*() {
    this.render('index');
  }).middleware());

  app.listen(3000);
}
