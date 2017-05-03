import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import Game from './Components/game';

const userId = new URLSearchParams(window.location.search).get('uid')

// render the app root
render(
  <Provider store={store}>
    <div className="layout">
      <Game userId={userId}/>
    </div>
  </Provider>
  
  , document.querySelector("#root")
);