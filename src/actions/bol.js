import Axios               from '../config/axios';
import * as types          from '../constants/quote-action-types';
import setAddressOptions   from '../services/address-options'

import { updateQuote }  from './quotes'
import { updateDriver } from './drivers'

export const updatePolicyDetails = (quoteParams, driverId, driverParams) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    return dispatch(updateQuote(quoteParams))
      .then(() => {
        dispatch(updateDriver(driverId, driverParams))
      })
  }
}






















































// export const zipCodeLookup = (zipCode) => {
//   return dispatch => {
//     dispatch({ type: types.SEARCHING_ZIP_CODE, data: true})
//
//     return Axios.get(`/locations/lookup?zip_code=${zipCode}`)
//       .then(response => {
//         const formattedData = setAddressOptions(response.data)
//         if (formattedData.length === 1) {
//           dispatch(createQuote({ address: formattedData[0] }))
//           dispatch({ type: types.SEARCHED_ZIP_CODE, data: [] })
//         } else {
//           dispatch({ type: types.SEARCHED_ZIP_CODE, data: formattedData })
//         }
//       })
//       .catch(error => {
//         dispatch({ type: types.SEARCHED_ZIP_CODE, data: [] })
//         dispatch(createQuoteResponse({ id: null, error: `We don't cover ${zipCode}` }));
//       })
//   }
// }
//
// export const createQuote = (quoteParams) => {
//   return dispatch => {
//     dispatch({ type: types.CREATING_QUOTE });
//
//     return Axios.post(`/quotes`, quoteParams)
//       .then(response => {
//         dispatch(createQuoteResponse(response.data));
//         localStorage.setItem('siriusQuoteId', response.data.id)
//       }).catch(e => {
//         dispatch(createQuoteResponse({ id: null, error: `We don't cover ${quoteParams.address.zip}` }));
//       })
//   }
// }
//
// export const createQuoteResponse = (data) => ({
//   type: types.CREATED_QUOTE,
//   data
// })
//
// export const updateQuote = (quote) => {
//   const quoteId = localStorage.getItem('siriusQuoteId')
//
//   return dispatch => {
//     dispatch({ type: types.UPDATING_QUOTE });
//
//     return Axios.patch(`/quotes/${quoteId}`, quote)
//       .then(response => {
//         dispatch(receiveUpdateQuoteResponse(response.data))
//       }).catch(error => {
//         dispatch(receiveUpdateQuoteResponse('error'));
//       })
//   }
// }
//
// const receiveUpdateQuoteResponse = (data) => ({
//   type: types.UPDATED_QUOTE,
//   data
// })
//
// export const purchaseQuote = (quoteId) => {
//   return dispatch => {
//     dispatch({ type: types.PURCHASING_QUOTE });
//
//     return Axios.post(`/quotes/${quoteId}/buy`, { status: 'purchasing' })
//       .then(response => {
//         dispatch(receivePurchasedQuoteResponse(response.data))
//       }).catch(error => {
//         dispatch(receivePurchasedQuoteResponse('error'));
//       })
//   }
// }
//
// const receivePurchasedQuoteResponse = (data) => ({
//   type: types.PURCHASED_QUOTE,
//   data
// })
//
// export const sendQuoteByEmail = (email) => {
//   const quoteId = localStorage.getItem('siriusQuoteId')
//
//   return dispatch => {
//     dispatch({ type: types.EMAILING_QUOTE });
//
//     return Axios.post(`/quotes/${quoteId}/send`, { to: email })
//       .then(response => {
//         dispatch(receiveSendQuoteResponse(response.data))
//       }).catch(error => {
//         dispatch(receiveSendQuoteResponse('error'));
//       })
//   }
// }
//
// const receiveSendQuoteResponse = (data) => ({
//   type: types.EMAILED_QUOTE,
//   data
// })
