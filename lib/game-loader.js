let YAML = require('yamljs');
let marked = require('marked');

marked.setOptions({
  gfm: true,
  tables: false,
  breaks: true,
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
      let parsedDocuments = [];
      for(let i = 0;i < documents.length; i += 2)
      {
        let game = YAML.parse(documents[i]);
        game.description = marked(documents[i + 1]);
        parsedDocuments.push(game);
      }

      let gameObj = parsedDocuments.shift();
      gameObj.expansions = parsedDocuments;

      return JSON.stringify(gameObj);
      break;
    default:
      throw "Unknown game_curator_schema version."
  }
  //
  // var res = yaml2json(source, options);
  // return JSON.stringify(res, undefined, '\t');
}
