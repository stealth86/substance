import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.hydrate(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
