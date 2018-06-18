let marked = require('marked');
let Entities = require('html-entities').AllHtmlEntities;

marked.setOptions({
  breaks: false, // probably won't work well with yaml line breaks
  gfm: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  tables: false,
});

module.exports = function(src) {
  return (new Entities()).encodeNonASCII(marked(src));
};
