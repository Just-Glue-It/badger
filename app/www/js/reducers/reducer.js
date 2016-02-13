import {combineReducers} from 'redux';
import dummy from './dummy';
import route from './route';
import home from './home';
import spiral from './spiral';

export default combineReducers({
  route,
  dummy,
  home,
  spiral
});
