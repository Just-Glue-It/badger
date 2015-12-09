import {combineReducers} from 'redux';
import dummy from './dummy';
import login from './login';

export default combineReducers({
  dummy,
  login
});
