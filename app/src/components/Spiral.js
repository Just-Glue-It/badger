import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';
import p5 from 'p5';
import Routes from '../routes';
import SpiralDriver from './SpiralDriver';


function viewSpiral(data) {
  SpiralDriver('spiralcanvas', data.toJS());
  return h('div#spiralcanvas');
}

function view(data) {
  console.log(data.toJS());
  return h('div', [
    viewSpiral(data)
  ]);
}

export default {view};
