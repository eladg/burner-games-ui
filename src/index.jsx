import React from 'react';
// import { ReactDOM } from 'react-dom';
var ReactDOM = require('react-dom');

import { Provider } from 'react-redux';

import store from './redux/store';

import Game from './Components/game';

const userId = new URLSearchParams(window.location.search).get('userId')

// render the app root
const layout = () => {
  return (
    <Provider store={store}>
      <div className="layout">
        <Game userId='888' />
      </div>
    </Provider>
  )
}

ReactDOM.render( layout() , document.querySelector("#root"));