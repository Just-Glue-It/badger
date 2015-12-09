import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RegisterActions from '../actions/RegisterActions';
import Register from '../components/Register/';

const RegisterContainer = React.createClass({
  render() {
    const {register, store, registerActions} = this.props;
    return (<div>
      <Register store={store} register={register} registerActions={registerActions} />
    </div>);
  }
});

function mapState(state) {
  return {
    register: state.register.toJS(),
  };
}

function mapDispatch(dispatch) {
  return {
    registerActions: bindActionCreators(RegisterActions, dispatch),
  };
}

RegisterContainer.propTypes = {
  registerActions: PropTypes.object,
  register: PropTypes.object,
};

export default connect(mapState, mapDispatch)(RegisterContainer);
