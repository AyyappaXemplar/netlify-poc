import Axios               from '../config/axios';
import * as types          from '../constants/quote-action-types';
import setAddressOptions   from '../services/address-options'

export const getQuote = (quoteId=localStorage.getItem('siriusQuoteId')) => {
  return dispatch => {
    dispatch({ type: types.GETTING_QUOTE })

    return Axios.get(`/quotes/${quoteId}`)
      .then(response => {
        dispatch({ type: types.RECEIVING_QUOTE, data: response.data })
      })
  }
}

export const zipCodeLookup = (zipCode) => {
  return dispatch => {
    dispatch({ type: types.SEARCHING_ZIP_CODE, data: true})

    return Axios.get(`/locations/lookup?zip_code=${zipCode}`)
      .then(response => {
        const formattedData = setAddressOptions(response.data)
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

    return Axios.post(`/quotes`, quoteParams)
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

export const updateQuote = (quote, quoteId = localStorage.getItem('siriusQuoteId')) => {

  return dispatch => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.patch(`/quotes/${quoteId}`, quote)
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

export const purchaseQuote = (quoteParams) => {
  return dispatch => {
    dispatch({ type: types.PURCHASING_QUOTE });
    dispatch(updateQuote(quoteParams, quoteParams.id))
      .then(response => {
        dispatch(receivePurchasedQuoteResponse(response.data))
      }).catch(error => {
        dispatch(receivePurchasedQuoteResponse('error'));
      })
  }
}

const receivePurchasedQuoteResponse = (data) => ({
  type: types.PURCHASED_QUOTE,
  data
})

export const sendQuoteByEmail = (email) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    dispatch({ type: types.EMAILING_QUOTE });

    return Axios.post(`/quotes/${quoteId}/send`, { to: email })
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

const catchQuoteErrors = (error, dispatch) => {
  if (error?.response?.data?.errors) {
    dispatch(receiveUpdateQuoteResponse({ errors: error.response.data.errors[0].message }))
  } else if (error.message) {
    dispatch(receiveUpdateQuoteResponse({ errors: error.message }))
  } else {
    dispatch(receiveUpdateQuoteResponse({ errors: error[0].message }))
  }
}

export const bindQuote = (quoteId= localStorage.getItem('siriusQuoteId'), quoteParams, billingParams) => {
  return dispatch => {
    dispatch({ type: types.BINDING_QUOTE });
    dispatch(updateQuote(quoteParams, quoteId))
      .then(() => {
        return Axios.post(`/quotes/${quoteId}/bind`, billingParams)
      }).then(response => dispatch(receiveUpdateQuoteResponse(response.data)))
      .catch(error => catchQuoteErrors(error, dispatch))
      .finally(() => dispatch({ type: types.FINISH_BINDING_QUOTE }))

  }
}

export const getCompleteQuote = (quoteId) => {
  return dispatch => {
    dispatch({type:'UPDATING_QUOTE'})
    return Axios.post(`/quotes/${quoteId}/complete`)
      .then(resp => dispatch(receiveUpdateQuoteResponse(resp.data)))
  }
}

export const fetchDocuments = (quoteId= localStorage.getItem('siriusQuoteId')) => {
  return dispatch => {
    dispatch({ type: types.FETCHING_QUOTE_DOCUMENTS });
    dispatch(getCompleteQuote(quoteId))
      .catch(error => catchQuoteErrors(error, dispatch))
      .finally(() => dispatch({ type: types.FINISHED_FETCHING_QUOTE_DOCUMENTS }))
  }
}
