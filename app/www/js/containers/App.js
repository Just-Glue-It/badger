// TODO import specific components

import React from 'react';
import badger from './badger';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as badgerActions from '../actions/badgerActions';

const App = React.createClass({
  render() {
    return (
      <div>
        // TODO
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(badgerActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
