import Immutable from 'immutable';
import KeyMirror from 'keymirror';

const Constants = KeyMirror({
  ID_CHANGED: null,
  PASS_CHANGED: null
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
  default:
    console.err("Bad Constant", constant, data);
  }
};

const initialModel = {
  id: "",
  pass: ""
};

function update(action, model) {
  switch(action.action) {
  case Constants.ID_CHANGED:
    return model.set('id', action.id);
}

