import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CurateElement from './curation/Curate';
import NavElement from './Nav';

class App extends React.Component {
  public render() {
    return (
      <div>
        <NavElement />
        <Switch>
          <Route path='/curate' component={CurateElement} />
        </Switch>
      </div>
    );
  }
}

export default App;
