import React from 'react';
import {render} from 'react-dom';

const Register = React.createClass({
  render() {
    return (
      <div>
        <input type='text' placeholder='Enter username'></input><br />
        <input type='password' placeholder='Enter password'></input><br /><br />
        <button type='button'>Register</button>
        <button type='button'>Back to Login</button>
      </div>
    );
  }
});

export default Register;
