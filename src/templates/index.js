var req = require.context('./', true, /template\.hbs$/i);

module.exports = {};

req.keys().forEach(function(key){
  let templateName = key.match(/\.\/([^\/]+)/)[1];
  module.exports[templateName] = req(key);
});
