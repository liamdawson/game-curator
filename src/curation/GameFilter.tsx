import * as lodash from "lodash";
import * as React from "react";
import './GameFilter.css';

interface IProps {
  filter?: string;
  onFilterChanged?: (filter: string) => void;
}

interface IState {
  query: string;
}

export default class CurateElement extends React.Component<IProps, IState> {
  // tslint:disable-next-line:no-console
  protected searchChangedCallback = lodash.debounce(() => {
    if (this.props.onFilterChanged) {
      this.props.onFilterChanged(this.state.query);
    }
  }, 350);

  constructor(props: IProps) {
    super(props);
    this.state = {
      query: props.filter || ''
    };
  }

  public render() {
    return (
      <div className="container">
        <form>
          <input
            className="game-filter"
            type="search"
            value={this.state.query}
            onChange={this.searchChanged}
            placeholder="Find games with a name containing..."
          />
        </form>
      </div>
    );
  }

  public searchChanged = (event: any) => {
    this.setState({ query: event.target.value });
    this.searchChangedCallback();
  };
}
