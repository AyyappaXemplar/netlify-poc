import React from 'react';
import { Button }      from 'react-bootstrap';

export default function SubmitButton({ text, disabled, showSpinner }) {
  return (
    <Button className='rounded-pill' size='lg' type="submit" block disabled={disabled}>
      { showSpinner ?
        <div className="spinner-border spinner-border-sm text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div> : <span>{ text }</span>
      }
    </Button>
  )
}
