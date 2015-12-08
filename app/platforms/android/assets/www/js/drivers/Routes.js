import Rx from 'rx';

function makeRouteDriver(initialRoute) {
  const routes = Rx.Observable.just(initialRoute);
  return (routeChange$) => {
    const r = Rx.Observable.merge(routes, routeChange$);
    r.subscribe(x => console.log(x));
    return r;
  };
}

export default {makeRouteDriver};
