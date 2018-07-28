import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store, history } from './store';
import Renderer from './components/Renderer';
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="container">
            <div className="jumbotron">
              <h1 className="display-4">Substance</h1>
              <p className="lead">
                Template Project
              </p>
              <Renderer width={420} height={420} pixelRatio={window.devicePixelRatio}>
                </Renderer>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
