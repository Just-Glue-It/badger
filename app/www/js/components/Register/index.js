import React, {PropTypes} from 'react';
const TextField = require('material-ui/lib/text-field');
const Button = require('material-ui/lib/raised-button');

const Register = React.createClass({
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
    const {register, store, registerActions} = this.props;
    return (
      <div>
      <h1> Register for badger! </h1>
      <TextField hintText='Username' value={this.state.username} onChange={this.usernameChange}/><br /><br />
      <TextField type='password' hintText='Password' value={this.state.password} onChange={this.passwordChange}/><br /><br /><br />
        <Button label='Register' onClick={() => registerActions.register(store.dispatch, this.state.username, this.state.password)}/>&nbsp;
        <Button label='Back To Login' onClick={() => registerActions.toLogin(store.dispatch)}/>
      </div>
    );
  }
});

Register.propTypes = {
  registerActions: PropTypes.object,
  register: PropTypes.object
};

export default Register;
