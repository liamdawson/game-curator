let marked = require('./markdown-formatter');
let YAML = require('yamljs');

module.exports = function(source) {
  if (this.cacheable) { this.cacheable(); }

  let documents = source.split(/^---\r?\n/m);
  documents.shift();

  var metaDoc = YAML.parse(documents.shift());

  switch (metaDoc.game_curator_schema) {
    case 2: {
      let game = YAML.parse(documents.shift());
      game.description = documents.shift();
      game.descriptionHtml = marked(game.description);
      return JSON.stringify(game);
    }
    // expansions will be in version 3
    default: {
      let err = {message: "Unknown game_curator_schema version."};
      throw err;
    }
  }
};
