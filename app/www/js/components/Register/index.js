import React, {PropTypes} from 'react';
const TextField = require('material-ui/lib/text-field');
const Button = require('material-ui/lib/raised-button');

const Login = React.createClass({
  render() {
    return (
      <div>
      <h1> Welcome to badger! </h1>
        <TextField hintText='Username' /><br /><br />
        <TextField type='password' hintText='Password' /><br /><br /><br />
        <Button label='Register' />&nbsp;
        <Button label='Back To Login' />
      </div>
    );
  }
});

export default Login;
