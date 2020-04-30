import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore, Middleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';

// const injectContext = require.context('@slot-pages', true, /inject\.ts/);
// const importAll:any[] = [];
// injectContext.keys().forEach((key: string) => {
//     console.error(injectContext(key));
//     importAll.push(injectContext(key).default)
// });
// console.log('dddddddcontext', importAll[0]);
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
