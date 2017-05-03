import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

let enhancers;
if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunkMiddleware));
} else {
  enhancers = compose(applyMiddleware(thunkMiddleware));
}

const store = createStore(reducer, enhancers);

export default store;