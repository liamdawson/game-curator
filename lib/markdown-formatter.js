let marked = require('marked');
let Entities = require('html-entities').AllHtmlEntities;

marked.setOptions({
  gfm: true,
  tables: false,
  breaks: false, // probably won't work well with yaml line breaks
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

module.exports = function (src) {
  return (new Entities()).encodeNonASCII(marked(src));
};
