import {h} from '@cycle/dom';
import Immutable from 'immutable';
import KeyMirror from 'keymirror';
import Rx from 'rx';
import Routes from '../routes';
import Spiral from './Spiral';

const Constants = KeyMirror({
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
    cordova.plugins.notification.local.schedule({
      id: 1,
      title: 'hey, what are you doing?',
      text: 'badger',
      every: 'minute',
    });
    return {
      action: constant,
      data: data.data,
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
    return model.set('spiralData', action.data);
  case Constants.ADD_DATA:
    window.cordova.plugins.notification.local.schedule({
      id: 1,
      title: 'hey, what are you doing?',
      text: 'badger',
      every: 'minute',
    });
    document.write('right after notif');
    return model
      .set('displaySpiral', true)
      .update('spiralData', data => data.push(action.data));
    //return model.set('spiralData', newData);
  default:
    console.error('Bad Constant', action);
  }
}

function intent(DOM, HTTP, persistantData) {
  const setData$ = persistantData
          .map(data => actions(Constants.SET_DATA, {data: data.get('pings')}));
  
  const addData$ = DOM
          .select('.addData')
          .events('click')
          .map(() => actions(Constants.ADD_DATA, {data: {time: new Date().getTime(), color: Math.random() * 255}}));

  return {
    DOM: Rx.Observable.merge(
      addData$
    ),
    route: Rx.Observable.never(),
    persistantData: Rx.Observable.never()
  };
}

function view(model) {
  console.log(model.toJS());
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
