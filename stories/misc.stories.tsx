import { storiesOf } from '@storybook/react';
import * as React from 'react';

import NewVersionBanner from '../src/components/misc/NewVersionBanner'

import '../src/index.css';

storiesOf('Miscellaneous Components', module)
  .add('new version banner', () => <NewVersionBanner display={true} />);
