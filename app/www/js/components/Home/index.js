import React, {PropTypes} from 'react';
// TODO spiral
const TextField = require('material-ui/lib/text-field');
const Button = require('material-ui/lib/raised-button');

const Home = React.createClass({
  render() {
    cordova.plugins.notification.local.schedule({
      id: 1,
      text: 'badger',
      message: 'Hey, what are you doing?',
      every: 'minute',
      firstAt: Date.now()
    });
    return (
      <div>
        <h1> Home </h1>
      </div>
    );
  }
});

export default Home;
