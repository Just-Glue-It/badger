import {run} from '@cycle/core';
import Rx from 'rx';
import {h, makeDOMDriver} from '@cycle/dom';
import Register from './components/Register';
import KeyMirror from 'keymirror';
import Immutable from 'immutable';

const Constants = KeyMirror({
  REGISTER: null,
  NO_OP: null
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
  default:
    console.error('Invalid Constant', constant, data);
  } 
}

const initialModel = Immutable.Map({
  register: Register.initialModel
});

function update(model, action) {
  switch(action.action) {
  case Constants.NO_OP:
    return model;
  case Constants.REGISTER:
    return initialModel.set(
      'register',
      Register.update(initialModel, action.childAction)
    );
  default:
    console.error('Invalid Constant', action);
  }
}

function view(model) {
  console.log('in main/view');
  return Register.view(model.get('register'));
}

function intent(DOM) {
  const registerAction$ = Register
          .intent(DOM)
          .map((register_action) =>
               action(Constants.REGISTER, {action: register_action}));
  
  return Rx.Observable.merge(
    registerAction$
  ).startWith(action(Constants.NO_OP));
}

function main({DOM}) {
  const action$ = intent(DOM);
  const model$ = action$.scan(update, initialModel).shareReplay(1);
  const view$ = model$.map(view);
  return {
    DOM: view$
  };
}

run(main, {
  DOM: makeDOMDriver('.app')
});
