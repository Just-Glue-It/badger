import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';

const Constants = KeyMirror({
  USER_STATUS: null
});

function actions(constant, data) {
  switch (constant) {
  default:
    console.error('Bad constant', constant, data);
  }
}

const initialModel = Immutable.map({
  status: ''
});

// TODO check if session ID exists - cordova localStorage
function update(model, action) {
  switch (action.action) {

  default:
    console.error('Bad constant', constant, data);
  }
}

function intent(DOM) {

  return Rx.Observable.merge(

  );
}

function view(model) {
  return h('div', [
    h('img', {attributes: {
      src:  '',
      height: '',
      width: ''
    }})
  ]);
}

export default {intent, initialModel, update, view};
