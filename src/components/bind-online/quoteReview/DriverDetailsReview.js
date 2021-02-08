import React from "react";
import FormContainer from "../../shared/FormContainer";
import { Row, Col } from "react-bootstrap";

import PolicyTerm from "./PolicyTerm";

export default function DriverDetailsReview({ quote }) {
  const driver = quote.drivers.find(driver => driver.policyholder)
  const emailPreferred = driver.communication_preference==='email'
  const phonePreferred = driver.communication_preference==='phone'
  const { address } = driver
  const addressDisplay = `${address.line1} ${address.line2} ${address.city}, ${address.state} ${address.zip_code}`

  return (
    <>
      <Row>
        <Col lg={{span: 6, offset: 3}}>
          <Row className='bg-white rounded shadow-sm mb-3 p-4'>
            <Col lg={6}>
              <p>
                <strong>Policy Holder</strong>
              </p>
              <p>{driver.first_name} {driver.last_name}</p>
              <p>
                <strong>Email { emailPreferred && "(Preferred Contact)" }</strong>
              </p>
              <p className='mb-0'>{driver.email}</p>
            </Col>
            <Col lg={6}>
              <p>
                <strong>Address</strong>
              </p>
              <p className="mb-4">{addressDisplay}</p>

              <p>
                <strong>Phone { emailPreferred && "(Preferred Contact)"}</strong>
              </p>
              <p className='mb-0'>{driver.phone}</p>
            </Col>
          </Row>
        </Col>
      </Row>

      <PolicyTerm quote={quote}/>
    </>
  );
}
