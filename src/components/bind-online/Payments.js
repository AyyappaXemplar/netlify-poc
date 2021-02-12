import React from "react";
import { Container } from 'react-bootstrap';
import TitleRow from "../shared/TitleRow";
import PaymentSelectionCard from "./payments/paymentSelectionCard";
import PaymentsForm from "./payments/PaymentForm"

const Payments = () => {
  return (
    <>
      <Container>
        <TitleRow
          title="Policy Payment"
          subtitle="Please review your policy statement and select a payment plan."
        />
        <PaymentSelectionCard />
        
        <PaymentsForm />
      </Container>
    </>
  );
};

export default Payments;
