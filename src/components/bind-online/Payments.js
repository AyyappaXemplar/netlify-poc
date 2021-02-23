import React, { useState }             from "react";
import { useSelector, useDispatch }    from 'react-redux'
import { Form, Container, Button, Row, Col } from 'react-bootstrap';

import PaymentSelectionCard from "./payments/PaymentSelectionCard";
import PaymentsForm         from "./payments/PaymentForm"
import TitleRow     from "../shared/TitleRow";
import BadgeText    from "../shared/BadgeText";

import { bindQuote } from '../../actions/quotes'

const Payments = () => {
  const quote = useSelector(state => state.data.quote)
  const rate  = useSelector(state => state.data.rates[0])
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [creditCard, setCreditCard]       = useState({})
  const [bankAccount, setBankAccount]     = useState({})

  const formProps = { paymentMethod, setPaymentMethod, creditCard, setCreditCard, bankAccount, setBankAccount }
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

        {/** Payment forms - include address forms */}
        <PaymentsForm {...formProps}/>

        {/** Submit Button, Cancel button and Badge text */}
        <Row className="justify-content-center">
          <Col lg={5}>
            <Button
              className="rounded-pill mb-3 mb-2"
              size="lg"
              variant="primary"
              type="submit"
              block
              disabled={false}
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
