import {compose, createStore} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import reducer from './reducers/reducer';

export default function configureStore(initialState) {
  return createStore(reducer, initialState);
}
