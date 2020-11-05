import Axios from 'axios';
import * as types from '../constants/rate-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE

export const rateQuote = () => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    dispatch({ type: types.RATING_QUOTE });
    return Axios.get(`${apiBase}/${namespace}/quotes/${quoteId}/rates`)
      .then(response => {
        dispatch(receiveRateQuoteResponse(response.data))
      }).catch(error => {
        if (['invalid_request_error', 'rater_error' ].includes(error?.type)) {
          dispatch(receiveRateQuoteResponse({ error: error.message, type: error.type }));
        } else {
          dispatch(receiveRateQuoteResponse({ error: 'There was an error rating your quote'}));
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

    return Axios.get(`${apiBase}/${namespace}/carriers/getallcarriers`)
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
//     return Axios.get(`${apiBase}/${namespace}/carriers/getcarrier`, { carrier_tag, product_tag, state_code })
//       .then(response => {
//         dispatch(receiveCarrierResponse(response.data))
//       })
//   }
// }

// const receiveCarrierResponse = (data) => ({
//   type: types.RECEIVE_CARRIER_INFO,
//   data
// })
