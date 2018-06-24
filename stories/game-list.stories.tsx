import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import GameList from "../src/components/GameList";
import Game from "../src/types/Game";

import "../src/index.css";

const baseSampleGame = {
  description: "This shouldn't show up in the game list.",
  descriptionHtml: "<p>This shouldn't show up in the game list.</p>"
};

const sampleGames: Game[] = [
  {
    ...baseSampleGame,
    abstract:
      "Co-operate with other corporations to make Mars habitable, but make sure you take the credit yourself!",
    difficulty: {
      rules: 3,
      strategy: 3
    },
    id: 167791,
    players: {
      ideal: {
        max: 4,
        min: 3
      },
      possible: {
        max: 5,
        min: 1
      }
    },
    time: 4,
    title: "Terraforming Mars"
  },
  {
    ...baseSampleGame,
    abstract:
      "Build the picturesque landscape of Carcassonne, while making tough decisions and outwitting your opponents.",
    difficulty: {
      rules: 2,
      strategy: 2
    },
    id: 822,
    players: {
      ideal: {
        max: 2,
        min: 2
      },
      possible: {
        max: 2,
        min: 5
      }
    },
    time: 2,
    title: "Carcassonne"
  }
];

storiesOf("Game List", module)
  .add("Empty state", () => (
    <div className="container" style={{ marginTop: "20px" }}>
      <GameList onSuggestGame={action("suggest-game")} games={[]} />
    </div>
  ))
  .add("With games", () => (
    <div className="container" style={{ marginTop: "20px" }}>
      <GameList games={sampleGames} onSelectionChanged={action("selection-changed")} />
    </div>
  ));
