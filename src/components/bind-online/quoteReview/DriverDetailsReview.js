import React from "react";
import { Row, Col } from "react-bootstrap";
//import { Link } from "react-router-dom";

import PolicyTerm from "./PolicyTerm";

export default function DriverDetailsReview({ quote }) {
  const driver = quote.drivers.find(driver => driver.policyholder)
  const emailPreferred = driver.communication_preference==='email'
  const phonePreferred = driver.communication_preference==='phone'
  const { address } = driver
  const addressDisplay = `${address.line1} ${address.line2 ? address.line2 : ""}`
  const cityStateDisplay = `${address.city}, ${address.state} ${address.zip_code}`

  return (
    <>
      <label>Details</label>
      <div className="bg-white rounded shadow-sm mb-3 p-4">
        <Row className="w-100">
          <Col>
            <p>
              <strong>Policy Holder</strong>
            </p>
          </Col>
          <Col>
            <p>
              <strong>Address</strong>
            </p>
          </Col>
        </Row>
        <Row className="w-100">
          <Col>
            <p>
              {driver.first_name} {driver.last_name}
            </p>
          </Col>
          <Col>
            <p className="mb-3 p-0">
              {addressDisplay}
              <br />
              {cityStateDisplay}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <strong>Email</strong>
            </p>
          </Col>
          <Col>
          <strong>Phone {phonePreferred && "(Preferred Contact)"}</strong>
          </Col>
        </Row>
        <Row>
          <Col><p className="mb-0">{driver.email}</p></Col>
          <Col><p className="mb-0">{driver.phone}</p></Col>
        </Row>
      </div>
      {/* <Col> */}
      {/* <div className="bg-white rounded shadow-sm mb-3 p-4 d-flex justify-content-between">
            <div className="w-50">
              <p>
                {driver.first_name} {driver.last_name}
              </p>
              <p>
                <strong>Email {emailPreferred && "(Preferred Contact)"}</strong>
              </p>
              <p className="mb-0">{driver.email}</p>
            </div>
            <div className="w-50">
              <p className="mb-4 p-0">
                {addressDisplay}
                <br />
                {cityStateDisplay}
              </p>
              <p>
                <strong>Phone {phonePreferred && "(Preferred Contact)"}</strong>
              </p>
              <p className="mb-0">{driver.phone}</p>
            </div>
          </div>
        </Col> */}

      <PolicyTerm quote={quote} />
    </>
  );
}
