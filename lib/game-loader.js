let marked = require('./markdown-formatter');
let YAML = require('js-yaml');

module.exports = function(source) {
  if (this.cacheable) this.cacheable();

  let documents = source.split(/^---\r?\n/m);
  documents.shift();

  var metaDoc = YAML.safeLoad(documents.shift());

  switch (metaDoc.game_curator_schema) {
    case 2: {
      let game = YAML.safeLoad(documents.shift());
      game.description = documents.shift();
      game.descriptionHtml = marked(game.description);
      return JSON.stringify(game);
    }
    case 3: {
      let game = YAML.safeLoad(documents.shift());
      game.schemaVersion = metaDoc.game_curator_schema;
      game.description = documents.shift();
      game.descriptionHtml = marked(game.description);

      if (!game.players.ideal) {
        game.players.ideal = game.players.possible;
      }

      game.expansions = [];

      // Parse expansions
      while (documents.length > 0) {
        let expansionMeta = YAML.safeLoad(documents.shift());
        let expansionDesc = documents.shift();

        if (!expansionMeta.players.possible) {
          expansionMeta.players.possible = game.players.possible;
        }

        if (!expansionMeta.players.ideal) {
          expansionMeta.players.ideal = expansionMeta.players.possible;
        }

        game.expansions.push(Object.assign({}, expansionMeta, {
          description: expansionDesc,
          descriptionHtml: marked(expansionDesc)
        }));
      }

      return JSON.stringify(game);
    }
    default: {
      let err = {message: "Unknown game_curator_schema version."};
      throw err;
    }
  }
};
