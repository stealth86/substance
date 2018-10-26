import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from "history/createBrowserHistory";
import rootReducer from './reducers';

const initialState = {}

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,initialState,composeEnhancers(applyMiddleware(...middleware)));

const browserHistory = createHistory();
export const history = syncHistoryWithStore(browserHistory, store);