import {REGISTER_CLICK_ACTION, REGISTER_ATTEMPT_FINISHED, TO_LOGIN_ACTION} from '../constants/action-constants';
import {setRoute} from './RouteActions';
import LoginContainer from '../containers/LoginContainer';
import request from 'superagent';

export function register(dispatch, username, password) {
  request
    .post('http://159.203.8.77/postgrest/users')
    .send({id: username, pass: password, role: 'appuser'})
    .end((err, data) => {
      if (!err) {
        dispatch(registerAttemptFinished({
          status: data.statusText
        }));
        dispatch(setRoute(LoginContainer));
      }
    });
  return {
    type: REGISTER_CLICK_ACTION
  };
}

export function registerAttemptFinished(response) {
  return {
    type: REGISTER_ATTEMPT_FINISHED,
    response
  };
}

export function toLogin(dispatch) {
  dispatch(setRoute(LoginContainer));
  return {
    type: TO_LOGIN_ACTION
  };
}
