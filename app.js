const Koa = require('koa'),
      Router = require('koa-router'),
      KoaJade = require('koa-jade'),
      fs = require('fs-promise'),
      path = require('path'),
      bodyParser = require('koa-bodyparser'),
      _ = require('lodash'),
      gameMatterDir = "games";

var app = new Koa();
app.use(require('koa-static')('./public/'));
app.use(bodyParser({multipart: true}));
var jadeware = new KoaJade({
  viewPath: "./views",
  debug: true,
  pretty: true,
  noCache: true,
  compileDebug: true,
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
  }).post('/generate', function*() {
    var requestedGames = [].concat(this.request.body.games).map((id) => _.merge({id: id}, games[parseInt(id)]));
    requestedGames.forEach((game) => game.expansions = []);
    Object.keys((this.request.body.expansions || {})).forEach((key) => {
      var gameKey = parseInt(key.substring(1, key.length));
      var expansionKeys = this.request.body.expansions[key];
      Object.keys((expansionKeys || {})).forEach((expansionIndex) => {
        requestedGames.filter((g) => g.id == gameKey)[0].expansions.push(
          games[gameKey].expansions[expansionKeys[expansionIndex]]);
      });
    })
    this.render('generate', {requestedGames: requestedGames});
  }).middleware());

  app.listen(process.env.PORT || 3000);
}
