import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import './styles/application.scss';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import siteReducer from './reducers';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;

const store = createStore(
  siteReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>loading</div>}>
      <Root store={store}/>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
