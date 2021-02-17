import React from "react";
import { Container } from 'react-bootstrap';
import TitleRow from "../shared/TitleRow";
import PaymentSelectionCard from "./payments/paymentSelectionCard";
import PaymentsForm from "./payments/PaymentForm"

const Payments = () => {

  const mockData = [
    {
        text: "Pay in Full",
        savingsText: "save $118",
        subText: "$784 due today",
        total: "$784/Total"
        
        
    },
    {
        text: "$187.92 Due Today",
        savingsText: null,
        subText: "11 payments in total",
        subText2:"10 installments of $150 (includes fees)",
        total:"$834/total"
        
    },
    {
        text: "$196.21 Due Today",
        savingsText: "save $118",
        subText: "12 payments in total",
        subText2:"11 installments of $130 (includes fees)",
        total:"$784/Total"
        
    }
]
  return (
    <>
      <Container>
        <TitleRow
          title="Policy Payment"
          subtitle="Please review your policy statement and select a payment plan."
        />
        <PaymentSelectionCard data={mockData}/>
        <PaymentsForm />
      </Container>
    </>
  );
};

export default Payments;
