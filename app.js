const Koa = require('koa'),
      Router = require('koa-router'),
      KoaJade = require('koa-jade');

var app = new Koa();
var jadeware = new KoaJade({
  viewPath: "./views",
  debug: true,
  pretty: true,
  app: app
});

app.use(new Router().get('/', function*() {
  this.render('index');
}).middleware());

app.listen(3000);
