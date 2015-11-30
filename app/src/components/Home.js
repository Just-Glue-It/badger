import {h} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';

const Constants = KeyMirror({
  SETTINGS: null
});

function actions(constant, data) {
  switch (constant) {

  default:
    console.error('Bad constant', constant, data);
  }
}

const initialModel = Immutable.map({
  HTTP: Rx.Observable.never()
});

function update(model, action) {
  switch (action.action) {

  default:
    console.error('Bad constant', constant, data);
  }
}

function intent(DOM, HTTP) {
  const settings$ = DOM
    .select('.settings')
    .events('click')
    .map(() => actions(Constants.SETTINGS));

  return Rx.Observable.merge(

  );
}

function view(model) { // TODO burgers
  return h('div', [
    // TODO add p5 spiral and previous days
  ]);
}

export default {intent, initialModel, update, view};
