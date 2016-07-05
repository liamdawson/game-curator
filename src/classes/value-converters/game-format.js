import YAML from 'js-yaml';
import wrap from 'word-wrap';

export class GameFormatValueConverter {
  toView(value) {
    const wrapOptions = {
      width: 80,
      indent: ''
    };
    const yamlOptions = {
      indent: 2,
      flowLevel: 2
    };
    const meta = {
      // eslint-disable-next-line camelcase
      game_curator_schema: 2
    };

    let game = Object.assign({}, value);
    game.abstract = game.abstract.trim();
    let desc = game.description.trim();

    delete game.description;
    delete game.description_html;

    return "---\n" +
      YAML.safeDump(meta, yamlOptions) +
      "---\n" +
      YAML.safeDump(game, yamlOptions) +
      "---\n" + wrap(desc, wrapOptions);
  }
}
