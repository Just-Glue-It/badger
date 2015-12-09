import {ADD_SPIRAL_DATA_ACTION, ADD_TAG_ACTION} from './../constants/action-constants';

export function add_ping_data(tags) {
  console.log('adding ping data');
  return {
    type: ADD_SPIRAL_DATA_ACTION,
    ping: {
      tags: tags,
      time: new Date().getTime()
    }
  };
}

export function add_tag(label) {
  console.log('adding tag action');
  return {
    type: ADD_TAG_ACTION,
    label: label
  };
}
