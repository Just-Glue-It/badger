import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DummyActions from '../actions/DummyActions';
import * as RouteActions from '../actions/RouteActions';
import AppContainer from './AppContainer.js';
import DummyComponent from '../components/DummyComponent/DummyComponent';
import Spiral from '../components/Home/Spiral';
import * as SpiralActions from '../actions/SpiralActions';
import HomeContainer from './HomeContainer';
import Tag from '../components/Tag';
import {List, Set} from 'immutable';
import mui from 'material-ui';
const RaisedButton = mui.RaisedButton;
const TextField = mui.TextField;

class PingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pingTime: new Date(),
      selected: Set(),
      newTag: ''
    };
  }
  render() {
    const handleTagTap = (tag) => () => {
      if (this.state.selected.includes(tag)) {
        this.setState({selected: this.state.selected.delete(tag)});
      } else {
        this.setState({selected: this.state.selected.add(tag)});
      }
    };
    console.log(this.state.selected);
    const tagSelected = (tag) => this.state.selected.includes(tag);
    const makeTag = (tag) =>
            <Tag tag={tag} selected={tagSelected(tag)} onChange={handleTagTap(tag)} />;
    const {spiral, spiralActions, route, routeActions} = this.props;
    return (
        <div>
        <span>
        <TextField hintText="New Tag" value={this.state.newTag} onChange={(v) => this.setState({newTag: v.target.value})} />
        <RaisedButton label={'Add Tag'} onClick={() => {
          if (this.state.newTag && !spiral.tags.find((t) => t.label === this.state.newTag)) {
            spiralActions.add_tag(this.state.newTag);
          }
        }} />
        </span>
        <div>
      {spiral.tags.map(makeTag)}
      </div>
        <RaisedButton
      label={'Create Data Point'}
      primary={true}
      style={{float: 'right'}}  onClick={() => {
        spiralActions.add_ping_data(this.state.selected.toList().toJS());
        routeActions.setRoute(HomeContainer);
      }} />
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

export default connect(mapState, mapDispatch)(PingContainer);
