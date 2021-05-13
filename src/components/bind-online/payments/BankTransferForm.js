import React                    from "react";
import { Form, Row, Col }       from "react-bootstrap";
import { withTranslation } from 'react-i18next'

import payment from 'payment';

export const BankTransferForm = withTranslation(['rates'])(({ bankAccount, setBankAccount, t }) => {

  function changeBankAccount(event) {
    const { value, name } = event.target;
    payment.restrictNumeric(event.target);
    setBankAccount(prev => ({...prev, [name]: value }))
  }

  return (
    <div className="mb-4 paymentsForm">
      <Row>
        <Col xl={6}>
          <Form.Group className="mb-3">
            <Form.Label>{t("payments.paymentForm.bankTransferForm.routingNumber")}</Form.Label>
            <Form.Control type="text" placeholder="22227654"
              name="routing_number" value={bankAccount.routing_number} onChange={(e)=>{changeBankAccount(e)}}/>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Form.Group className="mb-3">
            <Form.Label>{t("payments.paymentForm.bankTransferForm.accountNumber")}</Form.Label>
            <Form.Control type="text" placeholder="22227654"
              name="account_number" value={bankAccount.account_number} onChange={(e)=>{changeBankAccount(e)}} />
          </Form.Group>
        </Col>

        <Col xl={6}>
          <Form.Group className="mb-3">
            <Form.Label>{t("payments.paymentForm.bankTransferForm.confirmAccountNumber")}</Form.Label>
            <Form.Control type="text" placeholder="22227654" name="confirm_account_number"
              value={bankAccount.confirm_account_number} onChange={(e)=>{changeBankAccount(e)}} />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
});
