import {combineReducers} from 'redux';
import dummy from './dummy';
import route from './route';
import login from './login';
import spiral from './spiral';

export default combineReducers({
  route,
  dummy,
  login,
  spiral
});
