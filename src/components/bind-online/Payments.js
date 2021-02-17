import React from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';
import TitleRow from "../shared/TitleRow";
import PaymentSelectionCard from "./payments/paymentSelectionCard";
import PaymentsForm from "./payments/PaymentForm"
import BadgeText from "../shared/BadgeText";

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
        { /** Header */}
        <TitleRow
          title="Policy Payment"
          subtitle="Please review your policy statement and select a payment plan."
        />
        { /** Select Payments cards */}
        <PaymentSelectionCard data={mockData} />

        {/** Payment forms - include address forms */}
        <PaymentsForm />

        {/** Submit Button, Cancel button and Badge text */}
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={5}>
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
          <Col xs={12} md={12} lg={5} className="d-flex justify-content-center mb-5">
            <Button variant="link" className={"text-dark"}><u>Cancel and Return</u></Button>
          </Col>
          <BadgeText />
        </Row>
      </Container>
    </>
  );
};

export default Payments;
