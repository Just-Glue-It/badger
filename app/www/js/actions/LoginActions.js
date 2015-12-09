import {LOGIN_CLICK_ACTION, LOGIN_ATTEMPT_FINISHED, TO_REGISTER_ACTION} from '../constants/action-constants';
import {setRoute} from './RouteActions';
import HomeContainer from '../containers/HomeContainer';
import RegisterContainer from '../containers/RegisterContainer';
import request from 'superagent';

export function login(dispatch, username, password) {
  request
    .post('http://159.203.8.77/postgrest/tokens')
    .send({id: username, pass: password})
    .end((err, data) => {
      if (!err) {
        dispatch(loginAttemptFinished({
          token: JSON.parse(data.text).token
        }));
        dispatch(setRoute(HomeContainer));
      }
    });
  return {
    type: LOGIN_CLICK_ACTION
  };
}

export function loginAttemptFinished(response) {
  return {
    type: LOGIN_ATTEMPT_FINISHED,
    response
  };
}

export function toRegister(dispatch) {
  dispatch(setRoute(RegisterContainer));
  return {
    type: TO_REGISTER_ACTION
  };
}
