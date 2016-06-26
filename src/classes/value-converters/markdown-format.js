import marked from '../../../lib/markdown-formatter';

export class MarkdownFormatValueConverter {
  toView(value) {
    return marked(value);
  }
}
