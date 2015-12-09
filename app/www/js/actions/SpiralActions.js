import {ADD_SPIRAL_DATA_ACTION} from './../constants/action-constants';

export function add_ping_data(tag) {
  console.log('adding ping data');
  return {
    type: ADD_SPIRAL_DATA_ACTION,
    ping: {
      tag: tag,
      time: new Date().getTime()
    }
  };
}
