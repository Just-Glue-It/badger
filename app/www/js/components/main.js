import React from 'react';
import Login from './Login';
import {LOGIN_CLICK} from '../constants/ActionTypes';

const Main = React.createClass({
  render() {
    return (
      <div>
        {Login}
      </div>
    );
  }
});

export default Main;
