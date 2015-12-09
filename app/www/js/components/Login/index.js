import React, {PropTypes} from 'react';
const TextField = require('material-ui/lib/text-field');
const Button = require('material-ui/lib/raised-button');

const Login = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  usernameChange(e) {
    this.setState({username: e.target.value});
  },

  passwordChange(e) {
    this.setState({password: e.target.value});
  },

  alert() {
    console.log(this.state.username, this.state.password);
  },

  render() {
    const {loginActions} = this.props;
    return (
      <div>
          <h1> badger </h1>
          <TextField hintText='Username' value={this.state.username} onChange={this.usernameChange}/><br /><br />
          <TextField type='password' hintText='Password' value={this.state.password} onChange={this.passwordChange}/><br /><br /><br />
          <Button label='Login' onClick={loginActions.login.bind(this)}/>&nbsp;
          <Button label='Register' />
      </div>
    );
  }
});

Login.propTypes = {
  loginActions: PropTypes.object,
  login: PropTypes.object
};

export default Login;
