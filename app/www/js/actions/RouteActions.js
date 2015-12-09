import {CHANGE_ROUTE_ACTION} from './../constants/action-constants';

export function setRoute(route) {
  console.log('setting route', route);
  return {
    type: CHANGE_ROUTE_ACTION,
    route: route
  };
}
