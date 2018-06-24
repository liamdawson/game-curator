import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import GameList from '../src/components/GameList'

import '../src/index.css';

storiesOf('Game List', module)
  .add('Empty state', () => <div className="container" style={{marginTop: "20px"}}><GameList onSuggestGame={action('suggest-game')} games={[]} /></div>);
