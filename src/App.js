import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import createStore from './store';
import Window from './components/Window/Window';
import './App.css';

const { store, history } = createStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={Window}/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
