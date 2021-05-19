import React                from "react";
import { Image, Tabs, Tab } from "react-bootstrap";

import CardForm   from "./CardForm";
import secureIcon from "../../../images/secure_logo.svg";
import { BankTransferForm } from "./BankTransferForm";
import { withTranslation } from 'react-i18next'

const PaymentForm = ({ creditCard, setCreditCard, bankAccount, setBankAccount, paymentMethod,
                       setPaymentMethod, t }) => {
  const creditCardProps  = { creditCard, setCreditCard }
  const bankAccountProps = { bankAccount, setBankAccount }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2>{t("payments.paymentForm.title")}</h2>
        <Image src={secureIcon} />
      </div>

      <div>
        <Tabs
          id="payment-tabs"
          activeKey={paymentMethod}
          onSelect={(k) => setPaymentMethod(k)}
          variant="pills"
          className="p-0 d-block border-bottom payment-tabs mb-3"
        >
          <Tab
            eventKey="credit_card"
            title={t("payments.paymentForm.tabs.card")}
            tabClassName="rounded-0 px-2 py-1 bg-white shadow-none font-weight-bolder"
          >
            <CardForm {...creditCardProps}/>
          </Tab>
          <Tab
            eventKey="bank_account"
            title={t("payments.paymentForm.tabs.bankTransfer")}
            tabClassName="rounded-0 px-2 py-1 bg-white shadow-none font-weight-bolder"
          >
            <BankTransferForm {...bankAccountProps} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default withTranslation(['rates'])(PaymentForm);
