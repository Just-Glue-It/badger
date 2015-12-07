import Rx from 'rx';
import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Routes from '../routes';

const Constants = KeyMirror({
  ID_CHANGED: null,
  PASS_CHANGED: null,
  REGISTER_BTN: null,
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
    console.error('Bad Constant', constant, data);
  }
};

const initialModel = Immutable.Map({
  id: '',
  pass: ''
});

function update(model, action) {
  switch(action.action) {
  case Constants.ID_CHANGED:
    return model.set('id', action.id);
  case Constants.PASS_CHANGED:
    return model.set('pass', action.pass);
  case Constants.REGISTER_BTN:
    return model.merge({id: '', pass: ''});
  default:
    console.error('Bad Constant', action);
  }
}

function view(model) {
  return h('div',[
    h('input.id', {value: model.get('id')}),
    h('input.pass', {type: 'password', value: model.get('pass')}),
    h('button.register', 'Register'),
    h('button.back', 'Back to Login')
  ]);
}

function intent(DOM) {
  const back$ = DOM
      	  .select('.back')
      	  .events('click')
      	  .map( () => Routes.LOGIN );

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
  console.log(Rx);
  return {
    DOM: Rx.Observable.merge(
      register$, idChange$, passChange$
    ),
    route: back$
  };
}

export default {intent, initialModel, update, view};
