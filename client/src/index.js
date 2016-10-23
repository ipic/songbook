import React from 'react';
import ReactDOM from 'react-dom';
import Songbook from './App';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()

ReactDOM.render(
  <Songbook />,
  document.getElementById('root')
);
