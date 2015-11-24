import {h} from '@cycle/dom';
import Immutable from 'immutable';
import keyMirror from 'keymirror';
import {Rx} from '@cycle/core';

const Constants = keyMirror({
  ID_CHANGED: null,
  PASS_CHANGED: null,
  LOGIN_BTN: null
});

function actions(constant, data) {
  switch (constant) {
  case Constants.ID_CHANGED:
    return {
      action: constant,
      id: data.id
    };
  case Constants.PASS_CHANGED:
    return {
      action: constant,
      pass: data.pass
    };
  case Constants.LOGIN_BTN:
    return {
      action: constant
    };
  default:
    console.error('Bad Constant', constant, data);
  }
}

const initialModel = Immutable.Map({
  id: '',
  pass: ''
});

function update(model, action) {
  switch (action.action) {
  case Constants.ID_CHANGED:
    return model.set('id', action.id);
  case Constants.PASS_CHANGED:
    return model.set('pass', action.pass);
  case Constants.LOGIN_BTN:
    return model.merge({id: '', pass: ''});
  default:
    console.error('Bad Constant', constant, data);
  }
}

function intent() {
  const login$ = DOM
    .select('.login')
    .events('click')
    .map(() => actions(Constants.LOGIN_BTN));
  const idChanged$ = DOM
    .select('.id')
    .events('input')
    .map((ev) => actions(Constants.ID_CHANGED, {id: ev.target.value}));
  const passChanged$ = DOM
    .select('.pass')
    .events('input')
    .map((ev) => actions(Constants.PASS_CHANGED, {pass: ev.target.value}));

  return Rx.Observable.merge(login$, idChanged$, passChanged$);
}

function view(model) {
  return h('div', [
    h('input.id', {
      type: 'text'
    }, model.id),
    h('input.pass', {
      type: 'password'
    }, model.pass),
    h('button.login', 'Login')
  ]);
}
