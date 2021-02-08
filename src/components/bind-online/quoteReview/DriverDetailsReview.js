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
      <FormContainer bootstrapProperties={{ md: 6 }} mbClass="mb-3">
        <Row>
          <Col xs={12} md={6}>
            <p>
              <strong>Policy Holder</strong>
            </p>
            <p className={"mb-5"}>{driver.first_name} {driver.last_name}</p>
            <p>
              <strong>Email { emailPreferred && "(Preferred Contact)" }</strong>
            </p>
            <p>{driver.email}</p>
          </Col>
          <Col xs={12} md={6}>
            <p>
              <strong>Address</strong>
            </p>
            <p className="mb-4">{addressDisplay}</p>

            <p>
              <strong>Phone { emailPreferred && "(Preferred Contact)"}</strong>
            </p>
            <p>{driver.phone}</p>
          </Col>
        </Row>
      </FormContainer>

      <PolicyTerm quote={quote}/>
    </>
  );
}
