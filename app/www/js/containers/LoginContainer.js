import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as LoginActions from '../actions/LoginActions';
import Login from '../components/Login/';

const LoginContainer = React.createClass({
  render() {
    const {login, store, loginActions} = this.props;
    return (
      <div>
        <Login store={store} login={login} loginActions={loginActions}/>
      </div>);
  }
});

function mapState(state) {
  return {
    login: state.login.toJS(),
  };
}

function mapDispatch(dispatch) {
  return {
    loginActions: bindActionCreators(LoginActions, dispatch),
  };
}

LoginContainer.propTypes = {
  loginActions: PropTypes.object,
  login: PropTypes.object,
};

export default connect(mapState, mapDispatch)(LoginContainer);
