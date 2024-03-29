import React from 'react';
import mixpanel from '../../config/mixpanel'
import FormAlert       from '../shared/FormAlert'

export default function ErrorDisplay({ object }) {
  if (!object.errors) {
    return false
  } else if (!Array.isArray(object.errors)) {
    const errorMessage = "There was an error processing your quote, please contact us to finalize your quote."
    mixpanel.track('Undetermined rating error')
    return <FormAlert text={errorMessage} />
  } else {
    const errorMessages = object.errors.map(error => error.message)
    errorMessages.forEach(message => mixpanel.track(`Rating error: ${message}`))
    return errorMessages.map((message, i) =>  <FormAlert key={`error-${i}`} text={message} /> )
  }
}
