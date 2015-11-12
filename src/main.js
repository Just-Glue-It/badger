import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';

function main (responses) {
  const requests = {
    DOM: responses.DOM.select('.field').events('input')
      .map(ev => ev.target.value)
      .startWith('')
      .map(name =>
        h('div', [
          h('label', 'Name:'),
          h('input.field', {attributes: {type: 'text'}}),
          h('h1', 'Hello ' + name)
        ])
      )
  };
  return requests;
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app-container')
});
