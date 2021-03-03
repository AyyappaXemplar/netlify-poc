import Axios      from '../config/axios';
import * as types from '../constants/rate-action-types';

export const rateQuote = (id, options = {}) => {
  
  const quoteId = id || localStorage.getItem('siriusQuoteId')
  let typeParams = options.type ? `?type=${options.type}` : ''
  
  return (dispatch, getState) => {
    dispatch({ type: types.RATING_QUOTE });
    return Axios.get(`/quotes/${quoteId}/rates${typeParams}`)
      .then(response => {
        dispatch(receiveRateQuoteResponse(response.data))
      }).catch(error => {
        if (error?.response?.data?.errors) {
          dispatch(receiveRateQuoteResponse({ errors: error.response.data.errors }))
        } else if (error.message) {
          dispatch(receiveRateQuoteResponse({ errors: error.message }))
        }
      })
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
