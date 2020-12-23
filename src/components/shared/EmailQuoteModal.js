import React, { useState, useEffect } from 'react';
import { Modal, Form }                from 'react-bootstrap';
import { useDispatch, useSelector }   from 'react-redux';

import { sendQuoteByEmail } from '../../actions/quotes'

import './TransitionModal.scss';

import SubmitButton from './SubmitButton'

export default function EmailQuoteModal({ show, setShow }) {
  const [email, setEmail] = useState()
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()
  const emailingQuote = useSelector(state => state.state.emailingQuote)

  useEffect(() => {
    if (submitted && !emailingQuote) {
      setEmail(undefined)
      setShow(false)
    }
  }, [setShow, submitted, emailingQuote])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    dispatch(sendQuoteByEmail(email))
  }

  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div className="m-5">
          <h4 className="mb-4">Email My Quote</h4>
	        <p className="mb-4 font-weight-bolder">Please provide your email bellow and we'll send you a link to access this quote anytime</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Control type="email"
                required={true}
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <div className='mb-4'>
              <SubmitButton
                text="Email my Quote"
                disabled={false}
                showSpinner={false}
              />
            </div>
          </Form>

          <a
            href="#"
            className="text-dark mb-5"
            onClick={ () => { setShow(false) } }
          >
            Cancel
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
}
