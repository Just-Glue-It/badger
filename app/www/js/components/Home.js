import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';
import Routes from '../routes';
import Spiral from './Spiral';

const Constants = KeyMirror({
  SET_DATA: null,
  ADD_DATA: null
});

function actions(constant, data) {
  switch (constant) {
  case Constants.SET_DATA:
    return {
      action: constant,
      data: data.data
    };
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
  spiralData: Immutable.List(),
  displaySpiral: false
});

function update(model, action) {
  switch (action.action) {
  case Constants.SET_DATA:
    return model
      .set('displaySpiral', true)
      .set('spiralData', action.data);
  case Constants.ADD_DATA:
    return model;
  default:
    console.error('Bad Constant', action);
  }
}

function intent(DOM, HTTP, persistantData) {
  const setData$ = persistantData
          .map(data => actions(Constants.SET_DATA, {data: data.get('pings')}));

  const addDataClick$ = DOM
          .select('.addData')
          .events('click');
  
  const newData$ = addDataClick$.withLatestFrom(persistantData)
          .map(combined => {
            console.log(combined);
            return combined[1].update('pings', pings => pings.push({time: new Date().getTime(), color: Math.random() * 255}));
          });
  
  return {
    DOM: setData$, 
    route: Rx.Observable.never(),
    persistantData: newData$
  };
}

function view(model) {
  console.log(JSON.stringify(model));
  var spiral;
  if (model.get('displaySpiral')) {
    spiral = Spiral.view(model.get('spiralData'));
  } else {
    spiral = h('div');
  }
  return h('div', [
    h('div#spiralcanvas'),
    spiral,
    h('br'),
    h('br'),
    h('button.addData', 'new data'),
  ]);
}

export default {intent, initialModel, update, view};
