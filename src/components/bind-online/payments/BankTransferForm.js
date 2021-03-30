import React                    from "react";
import { Form, Row, Col }       from "react-bootstrap";

import payment from 'payment';

export const BankTransferForm = ({ bankAccount, setBankAccount }) => {

  function changeBankAccount(event) {
    const { value, name } = event.target;
    payment.restrictNumeric(event.target);
    setBankAccount(prev => ({...prev, [name]: value }))
  }

  return (
    <div className="mb-4 paymentsForm">
      <Row>
        <Col lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Routing Number</Form.Label>
            <Form.Control type="text" placeholder="22227654"
              name="routing_number" value={bankAccount.routing_number} onChange={(e)=>{changeBankAccount(e)}}/>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="text" placeholder="22227654"
              name="account_number" value={bankAccount.account_number} onChange={(e)=>{changeBankAccount(e)}} />
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Account Number</Form.Label>
            <Form.Control type="text" placeholder="22227654" name="confirm_account_number"
              value={bankAccount.confirm_account_number} onChange={(e)=>{changeBankAccount(e)}} />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};
