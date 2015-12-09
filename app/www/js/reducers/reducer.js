import {combineReducers} from 'redux';
import dummy from './dummy';
import route from './route';
import login from './login';

export default combineReducers({
  route,
  dummy
  login
});
