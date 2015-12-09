import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import AppContainer from './containers/AppContainer';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {Map} from 'immutable';

const store = configureStore();
console.log(store.getState(), store.getState().route.get('route'));
console.log(AppContainer);

class Router extends Component {
  render() {
    store.subscribe(this.forceUpdate.bind(this));
    return (<Provider store={store}>
      {React.createElement(store.getState().route.get('route'))}
    </Provider>);
  }
}

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
