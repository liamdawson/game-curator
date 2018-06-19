const { AllHtmlEntities } = require('html-entities');
const marked = require('marked');

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
  return (new AllHtmlEntities()).encodeNonASCII(marked(src));
};
