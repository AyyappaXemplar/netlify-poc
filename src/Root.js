import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import AppContainer from './containers/App.js'
import history from "./history";


const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <AppContainer/>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
