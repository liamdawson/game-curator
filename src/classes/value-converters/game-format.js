import YAML from 'yamljs';
import wrap from 'word-wrap';

export class GameFormatValueConverter {
  toView(value) {
    const wrapOptions = {
      width: 80,
      indent: ''
    };
    const meta = {
      game_curator_schema: 2
    }

    let game = Object.assign({}, value);
    game.abstract = game.abstract.trim();
    let desc = game.description.trim();

    delete game.description;
    delete game.description_html;

    return "---\n"
      + YAML.stringify(meta, 2, 2)
      + "---\n"
      + YAML.stringify(game, 2, 2)
      + "\n---\n" + wrap(desc, wrapOptions);
  }
}
