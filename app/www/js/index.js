import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import AppContainer from './containers/AppContainer';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('root')
);
