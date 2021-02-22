import React from 'react';
import mixpanel from '../../config/mixpanel'
import FormAlert       from '../shared/FormAlert'

export default function ErrorDisplay({ rates }) {
  if (!rates.errors) {
    return false
  } else if (!Array.isArray(rates.errors)) {
    const errorMessage = "There was an error processing your quote, please contact us to finalize your quote."
    mixpanel.track('Undetermined rating error')
    return <FormAlert text={errorMessage} />
  } else {
    const errorMessages = rates.errors.map(error => error.message)
    errorMessages.forEach(message => mixpanel.track(`Rating error: ${message}`))
    return errorMessages.map((message, i) =>  <FormAlert key={`error-${i}`} text={message} /> )
  }
}
