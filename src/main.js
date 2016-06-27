/* global document */

import {bootstrap} from 'aurelia-bootstrapper-webpack';

bootstrap(async (aurelia) => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-dialog');

  const rootElement = document.body;
  rootElement.setAttribute('aurelia-app', '');

  await aurelia.start();
  aurelia.setRoot('app', rootElement);
});
