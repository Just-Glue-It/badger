import {LOGIN_CLICK} from '../actions/badger';

export default function counter(state = 0, action) {
  switch (action.type) {
  case LOGIN_CLICK:
    return state;

  default:
    return state;
  }
}
