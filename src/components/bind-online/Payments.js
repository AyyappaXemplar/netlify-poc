import React, { useState }             from "react";
import { useSelector, useDispatch }    from 'react-redux'
import { Container, Button, Row, Col } from 'react-bootstrap';

import TitleRow from "../shared/TitleRow";
import PaymentSelectionCard from "./payments/PaymentSelectionCard";
import PaymentsForm from "./payments/PaymentForm"
import BadgeText from "../shared/BadgeText";

const Payments = () => {
  const rate = useSelector(state => state.data.rates[0])
  const [creditCard, setCreditCard]       = useState({})
  const [bankAccount, setBankAccount]     = useState({})

  const formProps = { creditCard, setCreditCard, bankAccount, setBankAccount }
  const dispatch = useDispatch()
  const paymentOptions = rate.payment_options
  const [paymentOption, setPaymentOption] = useState(paymentOptions[0])
  const paymentOptionProps = { paymentOption, setPaymentOption }

  return (
    <Container>
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
          <Button variant="link" className={"text-dark"}><u>Cancel and Return</u></Button>
        </Col>
        <BadgeText />
      </Row>
    </Container>
  );
};

export default Payments;
