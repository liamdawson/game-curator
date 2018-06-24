import * as React from "react";
import IGame from "../types/game";

interface IProps {
  games?: any[];
  onSuggestGame?: () => void;
}

export default class GameList extends React.Component<IProps> {
  protected noGamesFound = (
    <div style={{textAlign: "center"}}>
      <p>No games found.</p>
      <button onClick={this.props.onSuggestGame}>
        Missing a game? Contribute it!
      </button>
    </div>
  );

  protected get hasGames() {
    return this.props.games && this.props.games.length > 0;
  }

  public render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Title</th>
            </tr>
          </thead>
          <tbody>
            {this.hasGames
              ? this.props.games!.map(this.gameToGameRow)
              : this.noGamesFound}
          </tbody>
        </table>
      </div>
    );
  }

  protected gameToGameRow(game : IGame, index: number) {
    return (
    <tr key={game.id} className={index % 2 === 1 ? "odd" : "even"}>
      <td className="checkbox-cell"><label><input type="checkbox" id={`gamerow-${game.id}`}/></label></td>
      <td>{game.title}</td>
    </tr>
    );
  }
}
