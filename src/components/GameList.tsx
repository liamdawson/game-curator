import * as React from "react";

interface IProps {
  games?: any[];
  onSuggestGame?: () => void;
}

export default class GameList extends React.Component<IProps> {
  protected suggestAGame = (
    <button onClick={this.props.onSuggestGame}>
      Missing a game? Contribute it!
    </button>
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
              <th colSpan={2}>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.hasGames ? (
              this.props.games!.map((_, i) => <tr key={i} />)
            ) : (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <p>No games found.</p>
                  <p>{this.suggestAGame}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
