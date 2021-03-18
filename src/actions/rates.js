import Axios      from '../config/axios';
import * as types from '../constants/rate-action-types';

function catchRateErrors = (error, dispatch) => {
  if (error?.response?.data?.errors) {
    dispatch(receiveRateQuoteResponse({ errors: error.response.data.errors }))
  } else if (error.message) {
    dispatch(receiveRateQuoteResponse({ errors: error.message }))
  } else {
    dispatch(receiveRateQuoteResponse({ errors: error[0].message }))
  }
}

export const rateQuote = (id) => {
  const quoteId = id || localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    dispatch({ type: types.RATING_QUOTE });
    return Axios.get(`/quotes/${quoteId}/rates`)
      .then(response => dispatch(receiveRateQuoteResponse(response.data)))
      .catch(error => catchRateErrors(error, dispatch))
  }
}

export const rateFinalQuote = (id) => {
  const quoteId = id || localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    dispatch({ type: types.RATING_QUOTE });
    return Axios.get(`/quotes/${quoteId}/rates?type=final_quote`)
      .then(response => dispatch({type: types.RATED_FINAL_QUOTE, data: response.data}))
      .catch(error => catchRateErrors(error, dispatch))
  }
}

const receiveRateQuoteResponse = (data) => ({
  type: types.RATED_QUOTE,
  data
})

export const getAllCarriers = (carrier_tag, product_tag, state_code) => {
  return (dispatch) => {
    dispatch({ type: types.GETTING_ALL_CARRIERS_INFO })

    return Axios.get(`/carriers/getallcarriers`)
      .then(response => {
        dispatch(receiveAllCarriersResponse(response.data))
      })
  }
}

const receiveAllCarriersResponse = (data) => ({
  type: types.RECEIVE_ALL_CARRIERS_INFO,
  data
})

// const getCarrier = (carrier_tag, product_tag, state_code) => {
//   return (dispatch) => {
//     dispatch({ type: types.GETTING_CARRIER_INFO })
//
//     return Axios.get(`/carriers/getcarrier`, { carrier_tag, product_tag, state_code })
//       .then(response => {
//         dispatch(receiveCarrierResponse(response.data))
//       })
//   }
// }

// const receiveCarrierResponse = (data) => ({
//   type: types.RECEIVE_CARRIER_INFO,
//   data
// })
