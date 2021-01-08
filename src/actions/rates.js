import Axios      from '../config/axios';
import * as types from '../constants/rate-action-types';

export const rateQuote = () => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    dispatch({ type: types.RATING_QUOTE });
    return Axios.get(`/quotes/${quoteId}/rates`)
      .then(response => {
        dispatch(receiveRateQuoteResponse(response.data))
      }).catch(error => {
        dispatch(receiveRateQuoteResponse({ errors: error.response.data.errors }));
      })
  }
}

export const rateQuoteParams = (quoteId) => {
  return (dispatch, getState) => {
    dispatch({ type: types.RATING_QUOTE });
    return Axios.get(`/quotes/${quoteId}/rates`)
      .then(response => {
        dispatch(receiveRateQuoteResponse(response.data))
      }).catch(error => {
        // This error throws after a period of time. No clue why..?
        dispatch(receiveRateQuoteResponse({ errors: error.response.data.errors }));
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
