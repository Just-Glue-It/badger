import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DummyActions from '../actions/DummyActions';
import * as RouteActions from '../actions/RouteActions';
import AppContainer from './AppContainer.js';
import DummyComponent from '../components/DummyComponent/DummyComponent';

class HomeContainer extends Component {
  render() {
    const {home, homeActions, routeActions} = this.props;
    return (<div>
            <button onClick={() => {
              console.log('clicked');
              routeActions.setRoute(AppContainer);
            }}>Dummy</button>
    </div>);
  }
}

function mapState(state) {
  console.log(state);
  return {
    dummy: state.dummy.toJS(),
    route: state.route.toJS()
  };
}

function mapDispatch(dispatch) {
  return {
    dummyActions: bindActionCreators(DummyActions, dispatch),
    routeActions: bindActionCreators(RouteActions, dispatch)
  };
}

HomeContainer.propTypes = {
  dummyActions: PropTypes.object,
  dummy: PropTypes.object
};

export default connect(mapState, mapDispatch)(HomeContainer);
