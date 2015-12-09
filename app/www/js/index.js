import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import AppContainer from './containers/AppContainer';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import Login from './components/Login/';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
