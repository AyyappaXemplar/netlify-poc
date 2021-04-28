import React from 'react'
import { Row, Col, Image } from 'react-bootstrap';

import icon1 from '../../../images/icon_payment_1.svg'
import icon2 from '../../../images/icon_payment_2.svg'
import icon3 from '../../../images/icon_payment_3.svg'
import { getAmount }       from '../../../services/rate-payment-details'
import { getMonthlyTotal, payInFullDiscount } from '../../../services/payment-options'

const PaymentSelectionCard  = ({ option, paymentOption, setPaymentOption, index, rate, showPayInfullModal, setShowPayInfullModal }) => {

  const selectedClass       = paymentOption.plan_code === option.plan_code ? '  payment-card--bordered' : ''
  const payInFull           = option.plan_type === 'pay_in_full'
  const paymentTitle = payInFull ? option.plan_description : `${option.number_of_payments + 1} Payments - $${option.deposit / 100} Down`;
  const subtitle            = payInFull ? `$${option.deposit/100} Due Today` : `${option.number_of_payments} payments of $${getAmount(option)} (Includes Fees)`
  const totalPrice = getMonthlyTotal(option) / 100;
  
  const iconPicked = (index) => {
    switch(index+1) {
      case 3:
        return icon1
       
      case 2:
        return icon2
       
      case 1:
          return icon3
         
      default:
        return icon1
    }
  }
  
  return (
    <Row className='justify-content-center mb-3'>
      <Col lg={6} onClick={() => { setPaymentOption(option); setShowPayInfullModal(true); }}>
        <div className={`payment-card bg-white shadow-sm rounded p-3${selectedClass} d-flex align-items-center`}>
          <div className="rounded-circle bg-light p-3 align-items-center my-auto"><Image src={iconPicked(index)} /></div>
          <div className="ml-3 flex-grow-1">
            <p className="p-0 m-0 d-lg-flex align-items-center "><span className="mr-1 title">{paymentTitle}</span> <small>{option.savingsText}</small>&nbsp;</p>
            <p className="p-0 m-0">{!payInFull && subtitle}</p>
            <p className="p-0 m-0">{payInFull && <span className="text-primary">Save ${payInFullDiscount(rate)/100}! (Includes Fees)</span>}</p>
            {/* <p className="p-0 m-0">{subtitle2}</p> */}
          </div>
          <div className="mr-5 d-flex align-items-center">
            <p className='title m-0 p-0'>${totalPrice}&nbsp;total</p>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default PaymentSelectionCard
