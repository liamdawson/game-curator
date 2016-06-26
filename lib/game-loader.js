let YAML = require('yamljs');
let marked = require('marked');

marked.setOptions({
  gfm: true,
  tables: false,
  breaks: false, // probably won't work well with yaml line breaks
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

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
      break;
    // expansions will be in version 3
    default:
      throw "Unknown game_curator_schema version."
  }
}
