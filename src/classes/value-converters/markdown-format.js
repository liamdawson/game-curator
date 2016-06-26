import marked from 'marked';

export class MarkdownFormatValueConverter {

  constructor() {
    marked.setOptions({
      gfm: true,
      tables: false,
      breaks: false, // probably won't work well with yaml line breaks
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: true
    });
  }

  toView(value) {
    let source = value;

    return marked(source);
  }
}
