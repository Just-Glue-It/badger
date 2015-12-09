import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DummyActions from '../actions/DummyActions';
import * as RouteActions from '../actions/RouteActions';
import AppContainer from './AppContainer.js';
import DummyComponent from '../components/DummyComponent/DummyComponent';
import Spiral from '../components/Home/Spiral';
import * as SpiralActions from '../actions/SpiralActions';
import PingContainer from './PingContainer';
import mui from 'material-ui';
const RaisedButton = mui.RaisedButton;
import Tag from '../components/Tag';

class HomeContainer extends Component {
  render() {
    const {spiral, spiralActions, routeActions, store} = this.props;
    let stats = aggregateTagData(spiral.pings, spiral.tags);
    return (<div style={{textAlign: 'center'}} >
            <Spiral data={spiral.pings} />
            <RaisedButton label={"Take A Data Sample"} primary={true} onClick={() => {
              routeActions.setRoute(PingContainer);
            }} />
            <br/>
            <div>
            {stats.map(pair => <Tag tag={{label: pair[0].label + ' ' + Math.round(pair[1]*100) + '%', color: pair[0].color}} selected={true} /> )}
            
            </ div>
    </div>);
  }
}

function aggregateTagData(pings, tags) {
  let newTags = [];
  for (let i = 0; i < tags.length; i++) {
    newTags.push([tags[i], 0]);
  }
  let total = 0;
  for (let i = 0; i < pings.length; i++) {
    for (let k = 0; k < pings[i].tags.length; k++) {
      for (let j = 0; j < newTags.length; j++) {
        if (newTags[j][0].label === pings[i].tags[k].label) {
          newTags[j][1] += 1;
        }
        total += 1;
      }
    }
  }
  console.log(total);
  if (total > 0) {
  for (let i = 0; i < tags.length; i++) {
    newTags[i][1] /= total;
  }
  }
  return newTags;
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
