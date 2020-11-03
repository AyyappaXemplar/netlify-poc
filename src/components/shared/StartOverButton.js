import React from 'react';
import { useDispatch }     from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

function StartOverButton() {
  const dispatch = useDispatch()

  const resetQuote = () => {
    const warningText = "This will erase your information currently provided, and you will need to start over. This will reset your application."

    if (window.confirm(warningText)) {
      dispatch({ type: 'RESET_DATA' })
      localStorage.removeItem('siriusQuoteId')
    }
  }

  return (
    <Button block size='lg' onClick={resetQuote} variant="outline-dark" className="rounded-pill bg-white text-dark" >Start Over</Button>
  )
}

export default withTranslation(['common'])(StartOverButton)
