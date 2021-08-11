import React, { useEffect, useReducer, useState } from 'react';
import { Modal, Form, Button }          from 'react-bootstrap';
import { useDispatch, useSelector }     from 'react-redux';
import { sendQuoteByEmail } from '../../actions/quotes'
import { setAlert }         from '../../actions/state'
import './TransitionModal.scss';
import SubmitButton from './SubmitButton'
import { ReactComponent as EnvelopeIcon } from '../../images/envelope.svg';
import { monthlyPaymentOption,
  payInFullOption }       from '../../services/payment-options'
import { updateQuote } from "../../actions/quotes"

const initialState = {
  email: '',
  enableSubmit: false,
  submitSpinner: false
};

function checkValidEmail(email) { return !!email.match(/.+@.+\..+/) }

function quotesNewReducer(state, action) {
  switch (action.type) {
    case 'setEmail': {
      const email = action.email
      const enableSubmit = checkValidEmail(action.email)
      return { ...state, email, enableSubmit };
    }
    case 'submitForm': {
      return { ...state, submitted: true, enableSubmit: false }
    }
    case 'reset': {
      return initialState
    }
    default:
      throw new Error();
  }
}

export default function EmailQuoteModal({ show, setShow }) {
  const [state, localDispatch] = useReducer(quotesNewReducer, initialState);
  const dispatch = useDispatch()
  const emailingQuote = useSelector(state => state.state.emailingQuote)
  const quote = useSelector(state => state.data.quote)
  const rate = useSelector(state => state.data.rates[0])
  const selectedRate = useSelector(state => state.data.selectedRate)

  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'
  const defaultActiveKey  = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
  const [activeTab, setActiveTab] = useState(defaultActiveKey)

  useEffect(() => {
    if (state.submitted && !emailingQuote) {
      localDispatch({ type: 'reset' })
      const alert = { variant: 'success', text: `We emailed your quote to ${state.email}` }
      dispatch(setAlert(alert))
      setShow(false)
    }
  }, [setShow, state.submitted, state.email, dispatch, emailingQuote])

  const handleSubmit = (event) => {
    event.preventDefault()

    const displayedPaymentOptions = () => {
      return [monthlyPaymentOption(rate), payInFullOption(rate)]
    }

    const paymentOptions = displayedPaymentOptions()
    const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
    const payment_plan_code = paymentOptions[planCodeIndex].plan_code
    const quote_number = rate.id
    // console.log({...quote, payment_plan_code, quote_number})

    // UPDATING QUOTE NUMBER
    // console.log({...quote, payment_plan_code, quote_number})
    dispatch(sendQuoteByEmail(state.email))
    // dispatch(updateQuote({...quote, payment_plan_code, quote_number})).finally(() => {
    //   localDispatch({ type: 'submitForm' })
    //   dispatch(sendQuoteByEmail(state.email))  
    // })

    // get selected rate if there is one
    // if (!selectedRate) {
    //   // Handles first update w/o switch to other carrier
    //   console.log("1")
    //   const new_quote_num = quote.quote_number
    //   dispatch(updateQuote({...quote, payment_plan_code, quote_number})).finally(() => {
    //     localDispatch({ type: 'submitForm' })
    //     dispatch(sendQuoteByEmail(state.email))  
    //   })
    // } else {
    //   // compare selected rate id with current rate id
    //   console.log("2")
    //   quote.quote_number !== rate.id ? (() => {
    //     const new_quote_num = quote.quote_number
    //     dispatch(updateQuote({...quote, payment_plan_code, new_quote_num})).finally(() => {
    //       localDispatch({ type: 'submitForm' }).finally((dispatch(sendQuoteByEmail(state.email))))
          
    //     })
    //   })() : (() => {
    //     const new_quote_num = quote.quote_number
    //     console.log("3")
    //     dispatch(updateQuote({...quote, payment_plan_code, new_quote_num})).finally(() => {
    //       localDispatch({ type: 'submitForm' })
    //       dispatch(sendQuoteByEmail(state.email))  
    //     })  
    //   })()
    // }
  }

  const onChange = (event) => {
    const email = event.target.value
    localDispatch({ type: 'setEmail', email })
  }

  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div className="m-5">
            <div className="envelope-oval mx-auto rounded-circle mb-3">
              <EnvelopeIcon/>
            </div>
          <h5 className="mb-4 text-dark">Email My Quote</h5>
	        <p className="mb-4">Please provide your email bellow and we'll send you a link to access this quote anytime.</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Control type="email"
                required={true}
                placeholder="Email Address"
                value={state.email}
                onChange={onChange}
              />
            </Form.Group>

            <div className='mb-4'>
              <SubmitButton
                text="Email my Quote"
                disabled={!state.enableSubmit}
                showSpinner={state.submitted}
              />
            </div>
          </Form>

          <Button
            variant="link"
            className="bg-white border-0 p-0 text-dark mb-5"
            onClick={ () => { setShow(false) } }
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
