import {h} from '@cycle/core';

function view() {
  cordova.plugins.notification.local.schedule({
    id: 1,
    title: 'hey, what are you doing?',
    text: 'badger',
    every: 'minute',
    firstAt: 'now'
  });
  return h('div');
}

export default {view};
