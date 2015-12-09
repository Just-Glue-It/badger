import {combineReducers} from 'redux';
import dummy from './dummy';
import route from './route';
import login from './login';
import home from './home';
import register from './register';

export default combineReducers({
  route,
  dummy,
  login,
  home,
  register
});
