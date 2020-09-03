import React from 'react';
import ReactDOM from 'react-dom';
import i18n from './i18n';
import './styles/application.scss';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import siteReducer from './reducers';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import { makeServer } from "./server"

// if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
// }

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;

const store = createStore(
  siteReducer,
  composeEnhancers(applyMiddleware(thunk))
);

i18n
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['common'],
    returnObjects: true,
    preload: ['common','en']
  })
  .then((t) => {
    ReactDOM.render(
      <React.StrictMode>
        <Root store={store}/>
      </React.StrictMode>,
      document.getElementById('root')
    )
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
