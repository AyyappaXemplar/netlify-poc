import Axios from 'axios';
import * as types from '../constants/quote-action-types';
import setAddressOptions   from '../services/address-options'

const apiBase = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE

export const getQuote = () => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    dispatch({ type: types.GETTING_QUOTE })

    return Axios.get(`${apiBase}/${namespace}/quotes/${quoteId}`)
      .then(response => {
        dispatch({ type: types.RECEIVING_QUOTE, data: response.data })
      })
  }
}

export const zipCodeLookup = (zipCode) => {
  return dispatch => {
    dispatch({ type: types.SEARCHING_ZIP_CODE, data: true})

    return Axios.get(`${apiBase}/${namespace}/locations/lookup?zip_code=${zipCode}`)
      .then(response => {
        const formattedData = setAddressOptions(response.data)
        if (formattedData.length === 1) {
          dispatch(createQuote(formattedData[0]))
          dispatch({ type: types.SEARCHED_ZIP_CODE, data: [] })
        } else {
          dispatch({ type: types.SEARCHED_ZIP_CODE, data: formattedData })
        }
      })
      .catch(error => {
        dispatch({ type: types.SEARCHED_ZIP_CODE, data: [] })
        dispatch(createQuoteResponse({ id: null, error: `We don't cover ${zipCode}` }));
      })
  }
}

export const createQuote = (quoteParams) => {
  return dispatch => {
    dispatch({ type: types.CREATING_QUOTE });

    return Axios.post(`${apiBase}/${namespace}/quotes`, quoteParams)
      .then(response => {
        dispatch(createQuoteResponse(response.data));
        localStorage.setItem('siriusQuoteId', response.data.id)
      }).catch(e => {
        dispatch(createQuoteResponse({ id: null, error: `We don't cover ${quoteParams.address.zip}` }));
      })
  }
}

export const createQuoteResponse = (data) => ({
  type: types.CREATED_QUOTE,
  data
})

export const updateQuote = (quote) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.patch(`${apiBase}/${namespace}/quotes/${quoteId}`, quote)
      .then(response => {
        dispatch(receiveUpdateQuoteResponse(response.data))
      }).catch(error => {
        dispatch(receiveUpdateQuoteResponse('error'));
      })
  }
}

const receiveUpdateQuoteResponse = (data) => ({
  type: types.UPDATED_QUOTE,
  data
})

export const sendQuoteByEmail = (email) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    dispatch({ type: types.EMAILING_QUOTE });

    return Axios.post(`${apiBase}/${namespace}/quotes/${quoteId}/send?to=${email}`)
      .then(response => {
        dispatch(receiveSendQuoteResponse(response.data))
      }).catch(error => {
        dispatch(receiveSendQuoteResponse('error'));
      })
  }
}

const receiveSendQuoteResponse = (data) => ({
  type: types.EMAILED_QUOTE,
  data
})
