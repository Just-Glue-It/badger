import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';
import Routes from '../routes';

const Constants = KeyMirror({
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
    console.error('Bad Constant', action);
  }
}

function intent(DOM, route, persistantData) {
  const login$ = DOM
          .select('.login')
          .events('click')
          .map(() => Routes.HOME); //actions(Constants.LOGIN_BTN));
  const idChange$ = DOM
          .select('.id')
          .events('input')
          .map((ev) => actions(Constants.ID_CHANGED, {id: ev.target.value}));
  const passChange$ = DOM
          .select('.pass')
          .events('input')
          .map((ev) => actions(Constants.PASS_CHANGED, {pass: ev.target.value}));
  const register$ = DOM
      	  .select('.loginregister')
      	  .events('click')
      	  .map(() => Routes.REGISTER);

  return {
    DOM: Rx.Observable.merge(
      idChange$, passChange$
    ),
    route: Rx.Observable.merge(login$, register$),
    persistantData: Rx.Observable.never()
  };
}

function view(model) {
  return h('div', [
    h('input.id', {
      type: 'text',
      value: model.get('id')
    }),
    h('br'),
    h('input.pass', {
      type: 'password',
      value: model.get('pass')
    }),
    h('br'),
    h('button.login', 'Login'),
    h('button.loginregister', 'Register')
  ]);
}

export default {intent, initialModel, update, view};
