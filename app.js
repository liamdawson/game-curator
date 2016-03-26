'use strict';
const Koa = require('koa'),
      Router = require('koa-router'),
      KoaJade = require('koa-jade'),
      fs = require('fs-promise'),
      path = require('path'),
      bodyParser = require('koa-bodyparser'),
      packageObj = require('./package.json'),
      gameMatterDir = "games",
      GA_UA = process.env.GA_UA;

let app = new Koa(); //use let instead of var to notify that this object could change
app.use(require('koa-less')('./public/'));
app.use(require('koa-static')('./public/'));
app.use(bodyParser({multipart: true}));
let jadeware = new KoaJade({
  viewPath: "./views",
  debug: true,
  pretty: true,
  noCache: true,
  compileDebug: true,
  app: app
});

fs
  .readdir(gameMatterDir) //read files from this directory
  .then(files => (
    files.map(file => fs.readJson(path.join(gameMatterDir, file))) //try to read json from files
  ))
  .catch(err => {                                                  //catch errors when reading json
    console.error(`Couldn't load game matter files:\n${err.message}`);
    process.exit(1);
  })
  .then(gamePromises => Promise.all(gamePromises))                 //resolve reading promises
  .catch(err => {                                                  //catch any errors when reading to json
    console.error(`Couldn't load a game matter file:\n${err.message}`);
    process.exit(2);
  })
  .then(runServer)                                                 //after all reading is done, start the server
;

function runServer(games) {
  jadeware.locals.games = games;
  jadeware.locals.GA_UA = GA_UA;
  jadeware.locals.packageObj = packageObj;

  app.use(new Router()
    .get('/', function*() {
      this.render('index');
    })
    .post('/generate', function*() {
      const reqGames = this.request.body.games
      const requestedGames = Object
        .keys(reqGames || {})                       //don't trust that user sent any games at all
        .map(gameIndex => Object.assign(            //use Object.assign instead of _.merge to make run times faster, and less deps.
          {},                                       //create new object to assign key/value pairs
          games[parseInt(gameIndex.substring(1))],  //use the game from file as the base for our game values
          {
            expansions: (reqGames[gameIndex].expansions || []).map(expansion => (                    //set the expansions that were selected
              games[parseInt(gameIndex.substring(1))].expansions.find((_, idx) => idx == expansion ) //find which expansions should be added.
            ))
          }
        ));

      this.render('generate', { requestedGames });
    })
    .middleware());

  app.listen(process.env.PORT || 3000);
}
