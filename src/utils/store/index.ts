import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore, Middleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';

const middlewares: Middleware[] = [thunk];
const history = createBrowserHistory();

export function createReducer(injectedReducers = {}) {
  const rootReducers = combineReducers({
    router: connectRouter(history),
    rootReducer,
    ...injectedReducers,
  });

  return rootReducers;
}

export interface LifeStore extends Store {
  injectedReducers?: any;
}
const store: LifeStore = createStore(
  createReducer(),
  {},
  applyMiddleware(routerMiddleware(history), ...middlewares),
);
store.injectedReducers = {};

export default store;
