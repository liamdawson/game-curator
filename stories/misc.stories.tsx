import { boolean, withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import NewVersionBanner from '../src/components/misc/NewVersionBanner'

import '../src/index.css';

storiesOf('Miscellaneous Components', module)
  .addDecorator(withKnobs)
  .add('new version banner', () => <NewVersionBanner display={boolean('Display', true)} />);
