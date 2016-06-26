let marked = require('./markdown-formatter');
let YAML = require('yamljs');

module.exports = function (source) {
  this.cacheable && this.cacheable();

  var documents = source.split(/^---\r?\n/m);
  documents.shift();

  var metaDoc = YAML.parse(documents.shift());

  switch(metaDoc.game_curator_schema)
  {
    case 2:
      game = YAML.parse(documents.shift());
      game.description = documents.shift();
      game.description_html = marked(game.description);
      return JSON.stringify(game);
    // expansions will be in version 3
    default:
      throw "Unknown game_curator_schema version."
  }
}
