import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from 'connected-react-router'
import rootReducer from './reducers';

const initialState = {}

export const history = createHistory();

const middleware = [thunk,routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer(history),initialState,composeEnhancers(applyMiddleware(...middleware)));