import * as React from "react";
import IGame from "../types/Game";

interface IProps {
  games?: any[];
  onSuggestGame?: () => void;
  onSelectionChanged?: (selectedIds: number[]) => void;
}

interface IState {
  selectedGames: Set<number>
}

export default class GameList extends React.Component<IProps, IState> {
  protected noGamesFound = (
    <tr>
      <td colSpan={2}>
        <div style={{ textAlign: "center" }}>
          <p>No games found.</p>
          <button onClick={this.props.onSuggestGame}>
            Missing a game? Contribute it!
          </button>
        </div>
      </td>
    </tr>
  );

  protected get hasGames() {
    return this.props.games && this.props.games.length > 0;
  }

  protected get selections() {
    return Object.keys(this.state.selectedGames)
      .filter(key => this.state.selectedGames[key])
      .map(id => parseInt(id, 10));
  }

  constructor(props: IProps) {
    super(props);

    // TODO: pass in selected games
    this.state = {
      selectedGames: new Set<number>()
    };
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
              ? this.props.games!.map((game, index) => this.gameToGameRow(game, index))
              : this.noGamesFound}
          </tbody>
        </table>
      </div>
    );
  }

  public componentDidUpdate(_: IProps, oldState: IState) {
    if(this.props.onSelectionChanged) {
      const gamesChanged = Object.keys(this.state.selectedGames).sort() !== Object.keys(oldState.selectedGames).sort();

      if (!gamesChanged) {
        const gameKeys = Object.keys(oldState);
        const selectionsChanged = gameKeys.map(key => this.state.selectedGames[key]) !== gameKeys.map(key => this.state.selectedGames[key]);

        if (!selectionsChanged) {
          return;
        }
      }

      this.props.onSelectionChanged(this.selections);
    }
  }

  protected gameToGameRow(game: IGame, index: number) {
    return (
      <tr key={game.id} className={index % 2 === 1 ? "odd" : "even"}>
        <td className="checkbox-cell">
          <label>
            <input type="checkbox" id={`gamerow-${game.id}`} value={this.state.selectedGames[game.id]} onChange={this.gameSelectedChanged(game.id)} />
          </label>
        </td>
        <td>{game.title}</td>
      </tr>
    );
  }

  protected gameSelectedChanged(id: number) {
    const gameId = id;

    // TODO: this probably has the performance downside that causes tslint
    //       to ban arrow functions in JSX
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newGames = {...this.state.selectedGames};
      newGames[gameId] = event.target.checked;

      this.setState({ selectedGames: newGames });
    };
  }
}
