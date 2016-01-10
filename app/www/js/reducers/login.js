import {Map} from 'immutable';
import {LOGIN_CLICK_ACTION, LOGIN_ATTEMPT_FINISHED, TO_REGISTER_ACTION} from '../constants/action-constants';

const initialState = Map({
  isLoggedIn: false,
  loginAttemptFailed: false
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case LOGIN_CLICK_ACTION:
    console.log('clicker', action);
    return state;
  case LOGIN_ATTEMPT_FINISHED:
    console.log('logging in', action);
    if (action.response.token) {
      // alert(action.response.token);
      return state.set('isLoggedIn', !action.response.err).set('logginAttemptFailed', action.response.err);
    }
  case TO_REGISTER_ACTION:
    console.log('registering', action);
    return state;
  default:
    console.log(state);
    return state;
  }
}
