import {Map, List} from 'immutable';
import {ADD_SPIRAL_DATA_ACTION, ADD_TAG_ACTION} from './../constants/action-constants';
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

function loadTags() {
  const local = localStorage.getItem('tags');
  if (local) {
    return List(JSON.parse(local));
  } else {
    return List();
  }
}

function writeTags(tags) {
  localStorage.setItem('tags', JSON.stringify(tags.toJS()));
}

const initialState = new Map({
  pings: loadPings(),
  tags: loadTags()
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case ADD_TAG_ACTION:
    console.log('creating new tag');
    const tag = {
      label: action.label,
      freq: 0,
      color: [Math.random() * 255, Math.random() * 255, Math.random() * 255]
    };
    return state.update('tags', tags => {
      let newTags = tags.push(tag);
      writeTags(newTags);
      return newTags;
    });
  case ADD_SPIRAL_DATA_ACTION:
    console.log('Adding spiral data', action);
    const ping = {
      tags: action.ping.tags,
      time: action.ping.time,
      color: computeColor(action.ping.tags)
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


function computeColor(tags) {
  const avg = [0, 0, 0];
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i].color;
    avg[0] += tag[0];
    avg[1] += tag[1];
    avg[2] += tag[2];
  }
  avg[0] /= tags.length;
  avg[1] /= tags.length;
  avg[2] /= tags.length;
  
  return avg;
}
