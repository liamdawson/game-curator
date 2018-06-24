import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NavElement from './Nav';
import CurateElement from './pages/Curate';

class App extends React.Component {
  public render() {
    return (
      <div>
        <NavElement />
        <Switch>
          <Redirect from='/' to='/curate' exact={true} />
          <Route path='/curate' component={CurateElement} />
        </Switch>
      </div>
    );
  }
}

export default App;
