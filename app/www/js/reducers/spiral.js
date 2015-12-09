import {Map, List} from 'immutable';
import {ADD_SPIRAL_DATA_ACTION} from './../constants/action-constants';
import AppContainer from '../containers/AppContainer.js';
import HomeContainer from '../containers/HomeContainer.js';

const initialState = new Map({
  pings: List()
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case ADD_SPIRAL_DATA_ACTION:
    console.log('Adding spiral data', action);
    const ping = {
      tag: action.ping.tag,
      time: action.ping.time,
      color: Math.random() * 255
    };
    return state.update('pings', pings => pings.push(ping));
  default:
    return state;
  }
}
