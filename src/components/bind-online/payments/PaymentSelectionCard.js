import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap';

import icon from '../../../images/icon_payment_1.svg'
import { getAmount }       from '../../../services/rate-payment-details'
import { getMonthlyTotal } from '../../../services/payment-options'

const PaymentSelectionCard = ({ option, paymentOption, setPaymentOption }) => {
  const selectedClass = paymentOption.plan_code === option.plan_code ? '  payment-card--bordered' : ''
  const payInFull  = option.plan_type === 'pay_in_full'
  const title      = payInFull ? option.plan_description : `$${option.deposit/100} Due Today`
  const subtitle   = payInFull ? `$${option.deposit/100} Due Today` :
  `${option.number_of_payments} installments of $${getAmount(option)} (including fees)`
  const subtitle2  = payInFull ? '' : `${option.number_of_payments + 1} payments in total`

  return (
    <Row className='justify-content-center mb-3'>
      <Col lg={8} className={`payment-card bg-white shadow-sm rounded p-3${selectedClass} d-flex`}
        onClick={ ()=> setPaymentOption(option)}>
          <div className="rounded-circle bg-light p-3 align-items-center my-auto"><Image src={icon} /></div>
          <div className="ml-3 flex-grow-1">
            <strong className="mr-1">{title}</strong> <small>{option.savingsText}</small><br />
            <small>{subtitle2}</small><br/><small>{subtitle}</small>
          </div>
          <div className="mr-5">
            <strong>${getMonthlyTotal(option)}/total</strong>
          </div>
      </Col>
    </Row>
  )
}

export default PaymentSelectionCard
