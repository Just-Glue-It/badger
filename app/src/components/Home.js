import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';
import Routes from '../routes';

const Constants = {
  ADD_DATA: (data) => ({
    action: Constants.ADD_DATA
  })
};

function actions(constant, data) {
  switch (constant) {
  case Constants.ADD_DATA:
    return {
      action: constant,
      data: data.data
    };
  default:
    console.error('Bad Constant', constant, data);
  }
}

const initialModel = Immutable.Map({
  spiralData: Immutable.List()
});

function update(model, action) {
  switch (action.action) {
  case Constants.ADD_DATA:
    return model.update('spiralData', data => data.push(action.data.time));
    //return model.set('spiralData', newData);
  default:
    console.error('Bad Constant', action);
  }
}

function intent(DOM, HTTP) {
  const addData$ = DOM
          .select('.addData')
          .events('click')
          .map(() => actions(Constants.ADD_DATA, {data: {time: new Date().getTime(), color: 123}}));
  
  return {
    DOM: Rx.Observable.merge(
      addData$
    ),
    route: Rx.Observable.never()
  };
}

function view(model) {
  console.log(model.toJS());
  return h('div', [
    h('p', model.get('spiralData').toJS().toString()),
    h('br'),
    h('br'),
    h('button.addData', 'new data'),
  ]);
}

export default {intent, initialModel, update, view};