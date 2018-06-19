const YAML = require('js-yaml');
const marked = require('./markdown-formatter');

module.exports = function(source) {
  if (this.cacheable) { this.cacheable(); }

  const documents = source.split(/^---\r?\n/m);

  const metaDoc = YAML.safeLoad(documents.shift());

  if (metaDoc === undefined) {
    throw new Error("attempted to load a game from an empty document");
  }

  switch (metaDoc.game_curator_schema) {
    case 3: {
      const game = YAML.safeLoad(documents.shift());
      const descriptionDoc = documents.shift();

      if (game === undefined || descriptionDoc === undefined) {
        throw new Error("game missing mandatory detail for schema version 3");
      }

      // tslint:disable-next-line:no-console
      console.log(descriptionDoc);
      game.description = descriptionDoc.toString();
      game.descriptionHtml = marked(game.description);

      return JSON.stringify(game);
    }
    // expansions will be in version 3
    default: {
      throw new Error("unsupported game schema version");
    }
  }
};
