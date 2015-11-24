import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';

const Constants = KeyMirror({
  ID_CHANGED: null,
  PASS_CHANGED: null,
  REGISTER_BTN: null
});

function actions(constant, data) {
  switch(constant) {
  case Constants.ID_CHANGED:
    return {
        action: constant,
        id: data.id
    };
  case Constants.PASS_CHANGED:
    return {
      action: constant,
      pass: data.id
    };
  case Constants.REGISTER_BTN:
    return {
      action: constant
    };
  default:
    console.err("Bad Constant", constant, data);
  }
};

const initialModel = Immutable.Map({
  id: "",
  pass: ""
});

function update(action, model) {
  switch(action.action) {
  case Constants.ID_CHANGED:
    return model.set('id', action.id);
  case Constants.PASS_CHANGED:
    return model.set('pass', action.pass);
  case Constants.REGISTER_BTN:
    return model.merge({id: "", pass: ""});
  default:
    console.err("Bad Constant", action);
  }
}

function view(model) {
  return h('div',[
    h('input.id', model.id),
    h('input.pass', {type: 'password'}, model.pass),
    h('button.register', "Register")
  ]);
}

function intent(DOM) {
  const register$ = DOM
          .select('.register')
          .events('click')
          .map( () => actions(Constants.REGISTER_BTN) );
  
  const idChange$ = DOM
          .select('.id')
          .events('input')
          .map( (ev) => actions(Constants.ID_CHANGED, {id: ev.target.value}));
  
  const passChange$ = DOM
          .select('.pass')
          .events('input')
          .map( (ev) => actions(Constants.PASS_CHANGED, {pass: ev.target.value}));
  return Rx.Observable.merge(
    register$, idChange$, passChange$
  );
}

function main(DOM) {
  const action$ = intent(DOM);
  const model$ = action$.scan(update, initialModel);
  return {
    DOM: model$.map(view)
  };
}
