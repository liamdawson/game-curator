import marked from '../../../lib/markdown-formatter';

export class MarkdownFormatValueConverter {

  constructor() {

  }

  toView(value) {
    let source = value;

    return marked(source);
  }
}
