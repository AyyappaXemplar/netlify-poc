import React, { useState } from "react";
import { Row, Col, Image, Container, Tabs, Tab } from "react-bootstrap";
import CardForm from "./CardForm";
import secureIcon from "../../../images/secure_logo.svg";
import Address from "./Address";
import { BankTransferForm } from "./BankTransferForm";

const PaymentForm = ({ creditCard, setCreditCard, bankAccount, setBankAccount }) => {
  const [key, setKey] = useState("card");
  const creditCardProps  = { creditCard, setCreditCard }
  const bankAccountProps = { bankAccount, setBankAccount }

  /** TO DO: replace with image */
  const hr_style = {
    position: "absolute",
    background: "#f16322",
    height: "3px",
    width: "30px",
    borderRadius: "30%",
  };


  return (
    <Row className="justify-content-center mb-5">
      <Col
        lg={8}
        className="justify-content-center bg-white rounded shadow-sm p-4"
      >
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2>Payment</h2>
          <Image src={secureIcon} />
        </div>

        <div>
          <Tabs
            id="payment-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            variant="pills"
            className="p-0 d-block border-bottom payment-tabs"
          >
            <Tab
              eventKey="card"
              title="Card"
              tabClassName="rounded-0 px-2 py-1 bg-white shadow-none font-weight-bolder"
            >
              <CardForm {...creditCardProps}/>
            </Tab>
            <Tab
              eventKey="bank"
              title="Bank Transfer"
              tabClassName="rounded-0 px-2 py-1 bg-white shadow-none font-weight-bolder"
            >
              <BankTransferForm {...bankAccountProps} />
            </Tab>
          </Tabs>

          {/** Address form */}
          <Address />
        </div>
      </Col>
    </Row>
  );
};

export default PaymentForm;
