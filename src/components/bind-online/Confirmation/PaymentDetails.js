import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { getDeposit } from '../../../services/rate-payment-details'

const PaymentDetails = ({deposit}) => {
  return (
    <Row className="justify-content-center mb-3">
      <Col className="justify-content-center bg-white rounded shadow p-5" lg={6}>
        <p className="mb-3"><strong>Payment Details</strong></p>
          <Row className="mb-3">
            <Col><p>Amount Charged: ${getDeposit({deposit})}</p><p></p></Col>
            <Col><p>&nbsp;</p><p>&nbsp;</p></Col>
        </Row>
        <Row>
          <Col className="p-3 pink-bg">
            <p className="m-0"><strong>If paying with installments</strong> - All additional payments will be billed by the insurance carrier.</p>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PaymentDetails
