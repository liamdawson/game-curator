var req = require.context('./', true, /template\.js$/i);

module.exports = {};

req.keys().forEach(function(key) {
  let templateName = key.match(/\.\/([^\/]+)/)[1];
  module.exports[templateName] = req(key);
});
