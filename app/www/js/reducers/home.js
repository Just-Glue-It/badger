import {Map} from 'immutable';

const initialState = Map({
  inHere: true
});

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
  default:
    return state;
  }
}
