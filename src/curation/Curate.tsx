import { History, Location } from "history";
import * as qs from "query-string";
import * as React from "react";
import "./Curate.css";
import GameFilterElement from "./GameFilter";

export interface IProps {
  selectedGames: number[];
  history: History;
  location: Location;
}

export default class CurateElement extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  protected get filter() {
    return qs.parse(this.props.location.search).filter;
  }

  public render() {
    return (
      <div className="container">
        <div>
          <label>
            <div>Game search</div>
            <GameFilterElement
              filter={this.filter}
              onFilterChanged={this.searchChanged}
            />
          </label>
        </div>
      </div>
    );
  }

  public searchChanged = (filter: string) => {
    const newLocation = {
      ...this.props.history.location,
      search: `?filter=${filter}`
    };

    this.props.history.replace(newLocation);
    // tslint:disable-next-line:no-console
    console.log(this.props.history);
  };
}
