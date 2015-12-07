import Rx from 'rx';
import Immutable from 'immutable';

function writeLocalStorageData(data) {
  localStorage.setItem('pings', JSON.stringify(data.get('pings').toJS()));
  localStorage.setItem('tags', JSON.stringify(data.get('tags').toJS()));
  localStorage.setItem('settings', JSON.stringify(data.get('settings').toJS()));
}

function getLocalStorageData() {
  var pingStorage = localStorage.getItem('pings');
  var tagStorage = localStorage.getItem('tags');
  var settingsStorage = localStorage.getItem('settings');
  console.log(pingStorage, tagStorage, settingsStorage);
  const pings = pingStorage ? JSON.parse(pingStorage) : [];
  const tags = tagStorage ? JSON.parse(tagStorage) : [];
  const settings = settingsStorage ? JSON.parse(settingsStorage) : {freq: 45};
  return Immutable.Map({
    pings: Immutable.List(pings),
    tags: Immutable.List(tags),
    settings: Immutable.Map(settings)
  });
}

function makePersistantDataDriver() {
  return dataSource$ => dataSource$
    .map(d => {
      console.log('in persistant', JSON.stringify(d.toJS()));
      var data = getLocalStorageData();
      console.log('from local', data.toJS());
      if (d.get('pings')) {
        data = data.set('pings', d.get('pings'));
      }
      if (d.get('tags')) {
        data = data.set('tags', d.get('tags'));
      }
      if (d.get('settings')) {
        data = data.set('settings', d.get('settings'));
      }
      writeLocalStorageData(data);
      return data;
    }).startWith(getLocalStorageData());
}

export {makePersistantDataDriver};
