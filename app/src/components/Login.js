import {h} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';

const BADGER_LOGIN_API = 'http://159.203.8.77/postgrest/tokens';

const Constants = KeyMirror({
  ID_CHANGED: null,
  PASS_CHANGED: null,
  LOGIN_BTN: null,
  GOTO_REGISTER_BTN: null
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
  case Constants.GOTO_REGISTER_BTN:
    return {
      action: constant
    };
  default:
    console.error('Bad Constant', constant, data);
  }
}

const initialModel = Immutable.Map({
  id: '',
  pass: '',
  HTTP: Rx.Observable.empty()
});

function update(model, action) {
  switch (action.action) {
  case Constants.ID_CHANGED:
    return model.set('id', action.id);
  case Constants.PASS_CHANGED:
    return model.set('pass', action.pass);
  case Constants.LOGIN_BTN:
    return model.set('HTTP', Rx.Observable.just({
      url: BADGER_LOGIN_API,
      method: 'post',
      query: {
        id: action.id,
        pass: action.pass
      }
    }));
  case Constants.GOTO_REGISTER_BTN:
    // TODO route to the registration screen
  default:
    console.error('Bad Constant', constant, data);
  }
}

function intent(DOM, HTTP) {
  const login$ = DOM
          .select('.login')
          .events('click')
          .map(() => actions(Constants.LOGIN_BTN));
  const gotoRegister$ = DOM
          .select('.goto-register')
          .events('click')
          .map(() => actions(Constants.GOTO_REGISTER_BTN));
  const idChange$ = DOM
          .select('.id')
          .events('input')
          .map((ev) => actions(Constants.ID_CHANGED, {id: ev.target.value}));
  const passChange$ = DOM
          .select('.pass')
          .events('input')
          .map((ev) => actions(Constants.PASS_CHANGED, {pass: ev.target.value}));

  const loginAPIResponse$ = HTTP
          .filter(req$ => req$.request.url === BADGER_LOGIN_API)
          .mergeAll()
          .map(res => res.body)
          .startWith('Sending request')
          .map(body => localStorage.setItem('sessionID', body.token));

  return Rx.Observable.merge(
    login$, gotoRegister$, idChange$, passChange$
  );
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
    h('br'), h('br'),
    h('button.goto-register', 'Register')
  ]);
}

export default {intent, initialModel, update, view};
