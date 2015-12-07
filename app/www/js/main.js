import {run} from '@cycle/core';
import Rx from 'rx';
import {h, makeDOMDriver} from '@cycle/dom';
import Routes from './routes';
import Register from './components/Register';
import Login from './components/Login';
import KeyMirror from 'keymirror';
import Immutable from 'immutable';
import {makeRouteDriver} from './drivers/Routes';

console.log('print register main', Register);

const Constants = KeyMirror({
  CHILD: null,
  NO_OP: null,
  CHANGE_ROUTE: null
});

function action(constant, data) {
  switch(constant) {
  case Constants.NO_OP:
    return {
      action: constant
    };
  case Constants.CHILD:
    return {
      action: constant,
      childAction: data.action
    };
  case Constants.CHANGE_ROUTE:
    return {
      action: constant,
      route: data.route
    };
  default:
    console.error('Invalid Constant', constant, data);
  }
}

const initialModel = Immutable.Map({
  child: Routes.LOGIN,
  childModel: Routes.LOGIN.initialModel
});

function update(model, action) {
  console.log('update', action.action, action, model);
  switch(action.action) {
  case Constants.NO_OP:
    return model;
  case Constants.CHILD:
    const updatedChild = model.get('child').update(model.get('childModel'), action.childAction);
    return model.set('childModel', updatedChild);
  case Constants.CHANGE_ROUTE:
    console.log('update change route', action);

    return model
      .set('child', action.route)
      .set('childModel', action.route.initialModel);

    // return initialModel.merge({
    //   child: action.route,
    //   childModel: action.route.initialModel
    // });
  default:
    console.error('Invalid Constant', action);
    return model;
  }
}

function view(model) {
  console.log('in main/view', model);
  const child = model.get('child');
  const childModel = model.get('childModel');
  console.log(child);
  return child.view(childModel);
}

function intent(child, DOM, route) {
  console.log('intent', child);
  const routeChange$ = route.map(
    route => action(Constants.CHANGE_ROUTE, {route: route}));

  const childIntent = child.intent(DOM, route);
  const childAction$ = childIntent.DOM.map(
    childAction => action(Constants.CHILD, {action: childAction}));

  return {
    DOM: Rx.Observable.merge(
      childAction$, routeChange$
    ).startWith(action(Constants.NO_OP)),
    route: childIntent.route
  };
}

function main({DOM, route}) {
  const intent$ = route.map(child => intent(child, DOM, route));

  const model$ = intent$.map(
    intent => intent.DOM.scan(update, initialModel).shareReplay(1)
  ).mergeAll();

  const view$ = model$.map(view);

  return {
    DOM: view$,
    route: intent$.map(intent => intent.route).mergeAll()
  };
}

run(main, {
  DOM: makeDOMDriver('.app'),
  route: makeRouteDriver(Routes.LOGIN)
});
