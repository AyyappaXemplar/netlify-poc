import Axios from 'axios';

export const addressValidation = (address) => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_API_NAMESPACE}`
    const url = `${apiUrl}/address/validate`
    const body = {
      line1: address.line1,
      line2: address.line2 || "",
      city: address.city,
      state: address.state,
      zip: address.zip_code || address.zip,
    }
    // return Axios.get(url, { params: body })
    return Axios.get(url, { params: body }).then(api_response => {
      const response = {data: api_response}
      return response;
    })
}
