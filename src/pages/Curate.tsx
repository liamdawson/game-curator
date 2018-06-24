import { History, Location } from "history";
import * as React from "react";

import GameListElement from "../components/GameList";
import games from "../data/games";

export interface IProps {
  selectedGames: number[];
  history: History;
  location: Location;
}

export default class CurateElement extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div className="container">
        <p style={{textAlign: "right"}}>
          <button disabled={true}>Preview</button>
        </p>
        { /* TODO: on suggest, but that needs filtering */ }
        <GameListElement games={games} />
      </div>
    );
  }
}
