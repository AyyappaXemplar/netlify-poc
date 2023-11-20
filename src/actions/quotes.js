import Axios               from '../config/axios';
import * as types          from '../constants/quote-action-types';
import setAddressOptions   from '../services/address-options'

import {encryptData} from '../config/aes_encryptor';

export const getQuote = (quoteId=localStorage.getItem('siriusQuoteId')) => {
  return dispatch => {
    dispatch({ type: types.GETTING_QUOTE })

    return Axios.get(`/quotes/${quoteId}`)
      .then(response => {
        return dispatch({ type: types.RECEIVING_QUOTE, data: response })
      })
      .catch(error => catchQuoteErrors(error, dispatch))
  }
}

export const zipCodeLookup = (zipCode) => {
  return dispatch => {
    dispatch({ type: types.SEARCHING_ZIP_CODE, data: true})

    return Axios.get(`/locations/lookup?zip_code=${zipCode}`)
      .then(response => {

        const formattedData = setAddressOptions(response)
        if (formattedData.length === 1) {
          dispatch(createQuote({ address: formattedData[0] }))
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

    const {encryptedData, ivString} = encryptData(quoteParams);
    
    return Axios.post(`/quotes`, {
      encryptedData,
      ivString
    })
      .then(response => {
        dispatch(createQuoteResponse(response));
        localStorage.setItem('siriusQuoteId', response.id)
      }).catch(e => {
        dispatch(createQuoteResponse({ id: null, error: `We don't cover ${quoteParams.address.zip}` }));
      })
  }
}

export const createQuoteResponse = (data) => ({
  type: types.CREATED_QUOTE,
  data
})

export const updateQuote = (quote, quoteId = localStorage.getItem('siriusQuoteId')) => {
  return dispatch => {
    dispatch({ type: types.UPDATING_QUOTE });
    const {encryptedData, ivString} = encryptData(quote);

    return Axios.patch(`/quotes/${quoteId}`, {
      encryptedData,
      ivString
    })
      .then(response => {
        dispatch(receiveUpdateQuoteResponse(response))
      }).catch(error => {
        dispatch(receiveUpdateQuoteResponse('error'));
      })
  }
}

const receiveUpdateQuoteResponse = (data) => ({
  type: types.UPDATED_QUOTE,
  data
})

export const purchaseQuote = (quote) => {
  return dispatch => {
    dispatch({ type: types.PURCHASING_QUOTE });
    dispatch(updateQuote(quote, quote.id))
      .finally(() => dispatch(receivePurchasedQuoteResponse()))
  }
}

const receivePurchasedQuoteResponse = () => ({
  type: types.PURCHASED_QUOTE
})

export const sendQuoteByEmail = (email) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    dispatch({ type: types.EMAILING_QUOTE });
    const {encryptedData, ivString} = encryptData({ to: email });

    return Axios.post(`/quotes/${quoteId}/send`, { encryptedData, ivString })
      .then(response => {
        dispatch(receiveSendQuoteResponse(response))
      }).catch(error => {
        dispatch(receiveSendQuoteResponse('error'));
      })
  }
}

export const sendQuoteRequestByEmail = (email, fullName, phoneNumber) => {
  const quoteId = localStorage.getItem('siriusQuoteId')
  return dispatch => {
    dispatch({ type: types.EMAILING_QUOTE });
    const {encryptedData, ivString} = encryptData({ to: email, fullName, phoneNumber });
    return Axios.post(`/quotes/${quoteId}/contact_me`, { encryptedData, ivString })
      .then(response => {
        dispatch(receiveSendQuoteResponse(response))
      }).catch(error => {
        dispatch(receiveSendQuoteResponse('error'));
      })
  }
}

const receiveSendQuoteResponse = (data) => ({
  type: types.EMAILED_QUOTE,
  data
})

const catchQuoteErrors = (error, dispatch) => {
  if (error?.response?.data?.errors) {
    dispatch(receiveUpdateQuoteResponse({ errors: error.response.data.errors[0].message }))
  } else if (error.message) {
    dispatch(receiveUpdateQuoteResponse({ errors: error.message }))
  } else {
    dispatch(receiveUpdateQuoteResponse({ errors: error[0].message }))
  }
}

export const bindQuote = (quote, billingParams) => {
  return dispatch => {
    dispatch({ type: types.BINDING_QUOTE });
    dispatch(updateQuote(quote, quote.id))
      .then(() => {
        const {encryptedData, ivString} = encryptData(billingParams);
        return Axios.post(`/quotes/${quote.id}/bind`, { encryptedData, ivString })
      }).then(response => {
        dispatch(receiveUpdateQuoteResponse(response))
      })
      .catch(error => catchQuoteErrors(error, dispatch))
      .finally(() => dispatch({ type: types.FINISH_BINDING_QUOTE }))

  }
}

export const completeQuote = (quoteId) => {
  return dispatch => {
    dispatch({type:'UPDATING_QUOTE'})
    return Axios.post(`/quotes/${quoteId}/complete`)
      .then(resp => {
        dispatch(receiveUpdateQuoteResponse(resp))
      })
      .catch(error => catchQuoteErrors(error, dispatch))
  }
}

export const setQuickQuoteInitialLoad = bool => {
  return dispatch => {
    dispatch({ 
      type: 'SET_QUICK_QUOTE_INITIAL_LOAD_STATUS',
      data: bool
    })
  }
} 