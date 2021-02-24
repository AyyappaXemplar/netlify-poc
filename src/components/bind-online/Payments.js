import React, { useState, useEffect }             from "react";
import { useSelector, useDispatch }    from 'react-redux'
import { Form, Container, Button, Row, Col } from 'react-bootstrap';

import PaymentSelectionCard from "./payments/PaymentSelectionCard";
import PaymentsForm         from "./payments/PaymentForm"
import AddressForm          from "./payments/Address";
import TitleRow      from "../shared/TitleRow";
import BadgeText     from "../shared/BadgeText";
import FormContainer from "../shared/FormContainer";
import FormAlert     from "../shared/FormAlert"

import { bindQuote } from '../../actions/quotes'
import { findPolicyHolder } from '../../services/quotes'

import validatePayments from '../../validators/bind-online/PaymentsForm'

const initialCreditcard = {
  // first_name: '',
  number: '',
  date: '',
  cvv: ''
}

const initialBankTransfer = {
  // name: '',
  // address: '',
  // apt: '',
  // city: '',
  // state: '',
  // zip: '',
  routing_number: '',
  account_number: '',
  confirm_account_number: '',
  // bank_name: '',
  // account_type: 'checking'
}

const initialBillingAddress = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip_code: ''
}

const Payments = ({ history }) => {
  const quote = useSelector(state => state.data.quote)
  const rate  = useSelector(state => state.data.rates[0])
  const updatingQuote  = useSelector(state => state.state.updatingQuoteInfo)
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [creditCard, setCreditCard]       = useState(()=> quote.credit_card   || initialCreditcard)
  const [bankAccount, setBankAccount]     = useState(()=> quote.bank_transfer || initialBankTransfer)
  const [billingAddressFrom, setBillingAddressFrom] = useState('quote');
  const [billingInfo, setBillingInfo]       = useState({ first_name: '', last_name: ''})
  const [billingAddress, setBillingAddress] = useState(()=> initialBillingAddress)
  const [errors, setErrors]         = useState([])
  const [submitted, setSubmitted]           = useState(false)

  const formProps = { paymentMethod, setPaymentMethod, creditCard, setCreditCard, bankAccount, setBankAccount }
  const addressProps = { billingInfo, setBillingInfo, billingAddress, setBillingAddress,
                         billingAddressFrom, setBillingAddressFrom }
  const dispatch = useDispatch()
  const paymentOptions = rate.payment_options
  const [paymentOption, setPaymentOption] = useState(paymentOptions[0])
  const paymentOptionProps = { paymentOption, setPaymentOption }

  const getInfoFromQuote = () => {
    const policyHolder = findPolicyHolder(quote)
    const { first_name, last_name } = policyHolder
    return { first_name, last_name }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const payment_plan_code = paymentOption.plan_code
    let selectedPaymentMethod = paymentMethod === "credit_card" ?  { credit_card: creditCard } :
                                                            { bank_transfer: bankAccount }
    const address = billingAddressFrom === 'new' ? billingAddress : quote.address
    const info    = billingAddressFrom === 'new' ? billingInfo : getInfoFromQuote()
    const billingParams = { ...selectedPaymentMethod, ...info, address }

    const validationErrors = validatePayments(billingParams, { paymentMethod })

    if (validationErrors) {
      setErrors(err => Object.values(validationErrors).flat())
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setErrors([])
      dispatch(bindQuote(quote.id, { payment_plan_code }, billingParams))
    }
  }

  useEffect(() => {
    if (!submitted && updatingQuote) { // flag submission
      setErrors([])
      setSubmitted(true)
    } else if (quote.errors) { // display errors
      setErrors(quote.errors)
      setSubmitted(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (submitted && !updatingQuote) { // submitted without errors
      history.push('/bol/signatures')
    }
  }, [updatingQuote, submitted, history, quote])

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className='justify-content-center mb-5'>
          <Col lg={6}>
            { !!errors.length && errors.map((err, index) =>
                <FormAlert key={`error-${index}`} text={err}/>
            )}
          </Col>
        </Row>
        <TitleRow
          title="Policy Payment"
          subtitle="Please review your policy statement and select a payment plan."
        />

        <div className="mb-5">
          { paymentOptions.map(option =>
            <PaymentSelectionCard {...paymentOptionProps}
              option={option} key={option.plan_code}/>
          )}
        </div>

        <FormContainer bootstrapProperties={{lg: 6}}>
          <PaymentsForm {...formProps}/>
          <AddressForm {...addressProps}/>
        </FormContainer>

        <Row className="justify-content-center">
          <Col lg={5}>
            <Button className="rounded-pill mb-3 mb-2" size="lg" variant="primary"
              type="submit" block disabled={false}
            >
              Save & Continue
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={5} className="d-flex justify-content-center mb-5">
            <Button variant="link" type="submit" className="text-dark"><u>Cancel and Return</u></Button>
          </Col>
          <BadgeText />
        </Row>
      </Form>
    </Container>
  );
};

export default Payments;
