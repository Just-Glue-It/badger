import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import Home from '../components/Home/';

class HomeContainer extends Component {
  render() {
    const {home, homeActions} = this.props;
    return (
      <div>
        <Home />
      </div>
    );
  }
}

function mapState(state) {
  console.log(state);
  return {
    home: state.home.toJS()
  };
}

function mapDispatch(dispatch) {
  return {
    homeActions: bindActionCreators(HomeActions, dispatch),
  };
}

HomeContainer.propTypes = {
  homeActions: PropTypes.object,
  home: PropTypes.object
};

export default connect(mapState, mapDispatch)(HomeContainer);
