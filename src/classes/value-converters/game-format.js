import YAML from 'js-yaml';

const yamlOptions = {
  indent: 2,
  flowLevel: 2
};

export class GameFormatValueConverter {

  toView(value) {
    let fromMetaAndDesc = (meta, desc) => {
      return "---\n" +
        YAML.safeDump(meta, yamlOptions) +
        "---\n" +
        desc;
    };
    let fromGameObj = inputGame => {
      let game = {
        ...inputGame,
        abstract: inputGame.abstract.trim()
      };
      let desc = game.description.trim();

      delete game.description;
      delete game.descriptionHtml;
      delete game.schemaVersion;

      return fromMetaAndDesc(game, desc);
    };

    const meta = {
      // eslint-disable-next-line camelcase
      game_curator_schema: 3
    };

    let game = {...value};
    let expansions = game.expansions || [];
    delete game.expansions;

    return "---\n" +
      YAML.safeDump(meta) +
      [game].concat(expansions)
        .map(fromGameObj)
        .join("\n");
  }
}
