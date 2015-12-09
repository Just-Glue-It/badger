import {Map, List} from 'immutable';
import {CHANGE_ROUTE_ACTION} from './../constants/action-constants';
import AppContainer from '../containers/AppContainer.js';
import HomeContainer from '../containers/HomeContainer.js';
import LoginContainer from '../containers/LoginContainer';

const initialState = new Map({
  route: LoginContainer
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case CHANGE_ROUTE_ACTION:
    console.log('changing route', action);
    return state.set('route', action.route);
  default:
    return state;
  }
}
