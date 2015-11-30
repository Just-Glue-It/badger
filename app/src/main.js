import {run} from '@cycle/core';
import Rx from 'rx';
import {h, makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import Register from './components/Register';
import Login from './components/Login';
import KeyMirror from 'keymirror';
import Immutable from 'immutable';
import routes from './routes';

const Constants = KeyMirror({
  LOGIN: null,
  REGISTER: null,
  NO_OP: null,
  CHANGE_ROUTE: null
});

function action(constant, data) {
  switch(constant) {
  case Constants.NO_OP:
    return {
      action: constant
    };
  case Constants.REGISTER:
    return {
      action: constant,
      childAction: data.action
    };
  case Constants.CHANGE_ROUTE:
    return {
      action: constant,
      route: data.route
    };
  case Constants.LOGIN:
    return {
      action: constant,
      childAction: data.action
    };
  default:
    console.error('Invalid Constant', constant, data);
  }
}

const initialModel = Immutable.Map({
  login: Login.initialModel,
  register: Register.initialModel,
  HTTP: Rx.Observable.merge(Login.initialModel.HTTP, Register.initialModel.HTTP)
});

function update(model, action) {
  let newModel;
  switch(action.action) {
  case Constants.NO_OP:
    newModel = model;
  case Constants.REGISTER:
    newModel = initialModel.set(
      'register',
      Register.update(initialModel, action.childAction)
    );
  case Constants.CHANGE_ROUTE:
    newModel = initialModel.set('route', action.route);
  case Constants.LOGIN:
    newModel = initialModel.set(
      'login',
      Login.update(initialModel, action.childAction)
    );
  default:
    console.error('Invalid Constant', action);
  }

  newModel.set(
    'HTTP',
    Rx.Observable.merge(Login.initialModel.HTTP, Register.initialModel.HTTP)
  );
}

function view(model) {
  console.log('in main/view');                            // TODO
  // return Register.view(model.get('register'));
  return Login.view(model.get('login'));
}

function intent(DOM, HTTP) {
  // const routeChange$ = events
  //         .route
  //         .map((route) =>
  //              action(Constants.CHANGE_ROUTE, {route: route}));

  const registerAction$ = Register                    // TODO
          .intent(DOM)
          .map((register_action) =>
               action(Constants.REGISTER, {action: register_action}));

  const loginAction$ = Login
    .intent(DOM, HTTP)
    .map((login_action) =>
      action(Constants.LOGIN, {action: login_action}));

  return Rx.Observable.merge(
    registerAction$, loginAction$
  ).startWith(action(Constants.NO_OP));
}

function main({DOM, HTTP}) {
  const action$ = intent(DOM, HTTP);
  const model$ = action$.scan(update, initialModel).shareReplay(1);
  const view$ = model$.map(view);
  return {
    DOM: view$,
    HTTP: model$.map(m => m.HTTP)
  };
}

run(main, {
  DOM: makeDOMDriver('.app'),
  HTTP: makeHTTPDriver(),
  // events: {
  //   route: Rx.Observable.just(routes.LOGIN)
  // }
});
