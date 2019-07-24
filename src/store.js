import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
import rootReducer from './reducers';
import { connectRouter } from 'connected-react-router';

export const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

/*const initialState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

export const history = createHistory();

const middleware = [thunk,routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer(history),initialState,composeEnhancers(applyMiddleware(...middleware)));*/

export default (url = '/') => {
    // Create a history depending on the environment
    const history = isServer
      ? createMemoryHistory({
          initialEntries: [url]
        })
      : createBrowserHistory();
    const enhancers = [];
    // Dev tools are helpful
    if (process.env.NODE_ENV === 'development' && !isServer) {
      const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
      }
    }
    const middleware = [thunk, routerMiddleware(history)];
    const composedEnhancers = compose(
      applyMiddleware(...middleware),
      ...enhancers
    );
    // Do we have preloaded state available? Great, save it.
    const initialState = !isServer ? window.__PRELOADED_STATE__ : {};
    // Delete it once we have it stored in a variable
    if (!isServer) {
      delete window.__PRELOADED_STATE__;
    }
    // Create the store
    const store = createStore(
      connectRouter(history)(rootReducer),
      initialState,
      composedEnhancers
    );
    return {
      store,
      history
    };
  };