import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// import { BrowserRouter as Router } from 'react-router-dom'
import AppContainer from './containers/App.js'


const Root = ({ store }) => (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
