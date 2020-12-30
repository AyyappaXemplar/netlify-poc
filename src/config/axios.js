import Axios            from 'axios'
import { createAction } from '@reduxjs/toolkit'

import { store } from '../index'

const apiBase   = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE

Axios.interceptors.response.use(
  function(response) { return response },
  function (error) {
    if (error.response.status === 500) {
      const setApiUnavailable = createAction('SET_API_UNAVAILABLE')
      store.dispatch(setApiUnavailable(true))
    }
  }
);

Axios.defaults.baseURL = `${apiBase}/${namespace}`

export default Axios
