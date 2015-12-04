import {run} from '@cycle/core';
import Rx from 'rx';
import {h, makeDOMDriver} from '@cycle/dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import KeyMirror from 'keymirror';
import Immutable from 'immutable';

console.log('print register', Register);
export default {
  LOGIN: Login,
  REGISTER: Register,
  HOME: Home
};
