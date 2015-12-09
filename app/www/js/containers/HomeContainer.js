import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DummyActions from '../actions/DummyActions';
import * as RouteActions from '../actions/RouteActions';
import AppContainer from './AppContainer.js';
import DummyComponent from '../components/DummyComponent/DummyComponent';
import Spiral from '../components/Home/Spiral';
import * as SpiralActions from '../actions/SpiralActions';

class HomeContainer extends Component {
  render() {
    const {spiral, spiralActions, routeActions, store} = this.props;
    return (<div>
            <Spiral data={spiral.pings} />
            <button onClick={() => {
              spiralActions.add_ping_data('testing');
            }}>Add Data</button>
    </div>);
  }
}

function mapState(state) {
  console.log(state);
  return {
    route: state.route.toJS(),
    spiral: state.spiral.toJS()
  };
}

function mapDispatch(dispatch) {
  return {
    routeActions: bindActionCreators(RouteActions, dispatch),
    spiralActions: bindActionCreators(SpiralActions, dispatch)
  };
}

HomeContainer.propTypes = {
  store: PropTypes.object,
  routeActions: PropTypes.object,
  route: PropTypes.object,
  spiralActions: PropTypes.object,
  spiral: PropTypes.object
};

export default connect(mapState, mapDispatch)(HomeContainer);
