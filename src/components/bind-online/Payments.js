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
import SubmitButton  from "../shared/SubmitButton"

import { bindQuote } from '../../actions/quotes'
import { findPolicyHolder } from '../../services/quotes'

import validatePayments from '../../validators/bind-online/PaymentsForm'

const initialCreditcard = {
  number: '',
  cvv: '',
  exp_month:"",
  exp_year:""
}

const initialBankTransfer = {
  routing_number: '',
  account_number: '',
  confirm_account_number: '',
}

const initialBillingAddress = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip_code: ''
}

const Payments = ({ history }) => {
  const { quote } = useSelector(state => state.data)
  const { bindingQuote }  = useSelector(state => state.state)
  const rate  = useSelector(state => state.data.rates[0])
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [creditCard, setCreditCard]       = useState(()=> quote.credit_card   || initialCreditcard)
  const [bankAccount, setBankAccount]     = useState(()=> quote.bank_transfer || initialBankTransfer)
  const [billingAddressFrom, setBillingAddressFrom] = useState('quote');
  const [billingInfo, setBillingInfo]       = useState({ first_name: '', last_name: ''})
  const [billingAddress, setBillingAddress] = useState(()=> initialBillingAddress)
  const [errors, setErrors]       = useState([])
  const [submitted, setSubmitted] = useState(false)

  const currentBilingAddress = quote.drivers.find(driver => driver.policyholder).address
  const formProps = { paymentMethod, setPaymentMethod, creditCard, setCreditCard, bankAccount, setBankAccount }
  const addressProps = { billingInfo, setBillingInfo, billingAddress, setBillingAddress,
                         billingAddressFrom, setBillingAddressFrom, currentBilingAddress }
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
      dispatch(bindQuote(quote.id, { payment_plan_code }, billingParams))
    }
  }

  useEffect(() => {
    if (!submitted && bindingQuote) { // flag submission
      setErrors([])
      setSubmitted(true)
    } else if (!bindingQuote & submitted && quote.errors) { // display errors after submission has finished
      setErrors([...errors, quote.errors])
      setSubmitted(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (submitted && !bindingQuote) { // submitted without errors
      history.push('/bol/signatures')
    }
  }, [bindingQuote, submitted, history, quote.errors, errors])

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
            <SubmitButton text="Save & Continue" disabled={submitted} showSpinner={submitted}/>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={5} className="d-flex justify-content-center mb-5">
            <Button variant="link" type="submit" className="text-med-dark text-decoration-none">Cancel and Return</Button>
          </Col>
          <BadgeText />
        </Row>
      </Form>
    </Container>
  );
};

export default Payments;
