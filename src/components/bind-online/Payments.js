import React, { useState }             from "react";
import { useSelector, useDispatch }    from 'react-redux'
import { Form, Container, Button, Row, Col } from 'react-bootstrap';

import PaymentSelectionCard from "./payments/PaymentSelectionCard";
import PaymentsForm         from "./payments/PaymentForm"
import AddressForm          from "./payments/Address";
import TitleRow      from "../shared/TitleRow";
import BadgeText     from "../shared/BadgeText";
import FormContainer from "../shared/FormContainer";

import { bindQuote } from '../../actions/quotes'

const initialCreditcard = {
  first_name: '',
  number: '',
  date: '',
  cvv: ''
}

const initialBankTransfer = {
  name: '',
  address: '',
  apt: '',
  city: '',
  state: '',
  zip: '',
  routing_number: '',
  account_number: '',
  confirm_account_number: '',
  bank_name: '',
  account_type: 'checking'
}

const initialBillingAddress = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip_code: ''
}

const Payments = () => {
  const quote = useSelector(state => state.data.quote)
  const rate  = useSelector(state => state.data.rates[0])
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [creditCard, setCreditCard]       = useState(()=> quote.credit_card   || initialCreditcard)
  const [bankAccount, setBankAccount]     = useState(()=> quote.bank_transfer || initialBankTransfer)
  const [billingAddressFrom, setBillingAddressFrom] = useState('new');
  const [billing, setBilling]             = useState({ first_name: '', last_name: ''})
  const [billingAddress, setBillingAddress] = useState(()=> initialBillingAddress)

  const formProps = { paymentMethod, setPaymentMethod, creditCard, setCreditCard, bankAccount, setBankAccount }
  const addressProps = { billing, setBilling, billingAddress, setBillingAddress,
                         billingAddressFrom, setBillingAddressFrom }
  const dispatch = useDispatch()
  const paymentOptions = rate.payment_options
  const [paymentOption, setPaymentOption] = useState(paymentOptions[0])
  const paymentOptionProps = { paymentOption, setPaymentOption }

  function handleSubmit(event) {
    event.preventDefault()
    const payment_plan_code = paymentOption.plan_code
    const billingParams = paymentMethod === "card" ?  { credit_card: creditCard } :
    { bank_transfer: bankAccount }
    dispatch(bindQuote(quote.id, { payment_plan_code }, billingParams))
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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


        <FormContainer bootstrapProperties={{lg: 8}}>
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
