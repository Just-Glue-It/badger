import React, {PropTypes} from 'react';
const TextField = require('material-ui/lib/text-field');
const Button = require('material-ui/lib/raised-button');

const divStyles = {
  display: 'inlineBlock',
  textAlign: 'center'
};

const headerStyles = {
  fontFamily: 'Montserrat'
};

const fontStyles = {
  fontFamily: 'Roboto',
};

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
    const {login, store, loginActions} = this.props;
    return (
      <div style={divStyles}>
          <h1 style={headerStyles}> badger </h1>
          <TextField hintText='Username' value={this.state.username} onChange={this.usernameChange} style={fontStyles} underlineFocusStyle={{borderColor: '#00c853'}}/><br /><br />
          <TextField type='password' hintText='Password' value={this.state.password} onChange={this.passwordChange} style={fontStyles} underlineFocusStyle={{borderColor: '#00c853'}}/><br /><br /><br />
          <Button label='Login' onClick={() => loginActions.login(store.dispatch, this.state.username, this.state.password)} backgroundColor='#00c853' style={fontStyles}/>&nbsp;
          <Button label='Register' onClick={() => loginActions.toRegister(store.dispatch)} backgroundColor='#00c853' style={fontStyles}/>
      </div>
    );
  }
});

Login.propTypes = {
  loginActions: PropTypes.object,
  login: PropTypes.object,
};

export default Login;
