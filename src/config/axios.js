import Axios            from 'axios'
import { createAction } from '@reduxjs/toolkit'

import { SET_API_UNAVAILABLE } from '../constants/state-action-types'

import { store } from '../index'

import {decryptData} from '../config/aes_encryptor';

const apiBase   = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE

Axios.interceptors.response.use(
  function(response) { 
    if(response && response.data){
      const api_data = decryptData(response.data.data, response.data.ivString)
      return api_data
    }
    else {
      return response
    }
  },
  function (error) {
    if (error.response.status === 500) {
      const setApiUnavailable = createAction(SET_API_UNAVAILABLE)
      store.dispatch(setApiUnavailable(true))
    } else {
      return Promise.reject(error);
    }
  }
);

Axios.defaults.baseURL = `${apiBase}/${namespace}`

export default Axios
