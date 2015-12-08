import React from 'react';
import {render} from 'react-dom';

const Login = React.createClass({
  render() {
    const {loginClick, user} = this.props;
    return (
      <div>
        <input type='text' placeholder='Enter username'></input><br />
        <input type='password' placeholder='Enter password'></input><br /><br/>
        <button type='button' >Login</button>
        <button type='button'>Register</button><br /><br />
      </div>
    );
  }
});

export default Login;
