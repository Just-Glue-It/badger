import {Map} from 'immutable';
import {REGISTER_CLICK_ACTION, REGISTER_ATTEMPT_FINISHED, TO_LOGIN_ACTION} from '../constants/action-constants';

const initialState = Map({
  isRegistered: false,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case REGISTER_CLICK_ACTION:
    console.log('registering', action);
    return state;
  case REGISTER_ATTEMPT_FINISHED:
    console.log('done enlisting', action);
    return state.set('isRegistered', true);
  case TO_LOGIN_ACTION:
    console.log('back to login', action);
    return state;
  default:
    console.log(state);
    return state;
  }
}
