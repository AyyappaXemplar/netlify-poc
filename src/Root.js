import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './components/App.js'
import AppConversational from './components/AppConversational.js'
import history from "./history";


const Root = ({ store }) => {
  const isConversatinonalApp = window.location.pathname.match(/conversation/)
  const app = isConversatinonalApp ? <AppConversational/> : <App/>
  return (
    <Provider store={store}>
      <Router history={history}>
        {app}
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
