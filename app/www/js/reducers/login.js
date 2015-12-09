import {Map, List} from 'immutable';
import {LOGIN_CLICK} from '../constants/action-constants';
import {superagent as request} from 'superagent';

const initialState = {
  isLoggedIn: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_CLICK:
    request
      .post('http://159.203.8.77/postgrest/tokens')
      .send({id: username, pass: password})
      .end((err, data) => {
        console.log(err, data);
      });
    return state;
  default:
    // console.log(state);
    return state;
  }
}
