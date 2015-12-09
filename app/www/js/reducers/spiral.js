import {Map, List} from 'immutable';
import {ADD_SPIRAL_DATA_ACTION} from './../constants/action-constants';
import AppContainer from '../containers/AppContainer.js';
import HomeContainer from '../containers/HomeContainer.js';

function loadPings() {
  const local = localStorage.getItem('pings');
  if (local) {
    return List(JSON.parse(local));
  } else {
    return List();
  }
}

function writePings(pings) {
  localStorage.setItem('pings', JSON.stringify(pings.toJS()));
}

const initialState = new Map({
  pings: loadPings()
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
    return state.update('pings', pings => {
      let newPings = pings.push(ping);
      writePings(newPings);
      return newPings;
    });
  default:
    return state;
  }
}
