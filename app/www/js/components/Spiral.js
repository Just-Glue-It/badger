import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';
import p5 from 'p5';
import Routes from '../routes';
import SpiralDriver from './SpiralDriver';

function view(data) {
  SpiralDriver('spiralcanvas', data.toJS());
  return h('div');
}

export default {view};
