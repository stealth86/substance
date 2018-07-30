import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store, history } from './store';
import Window from './components/Window';
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="container-fluid">
            <Window/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
