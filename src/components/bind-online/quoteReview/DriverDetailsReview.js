import React from "react";
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
            <label>Details</label>
          {/* <button type="button" className="btn btn-link"> */}
          {/*   Edit */}
          {/* </button> */}
      <Row>
        <Col>
          <div className='bg-white rounded shadow-sm mb-3 p-4 d-flex justify-content-between'>
            <div className='w-50'>
              <p>
                <strong>Policy Holder</strong>
              </p>
              <p>{driver.first_name} {driver.last_name}</p>
              <p>
                <strong>Email { emailPreferred && "(Preferred Contact)" }</strong>
              </p>
              <p className='mb-0'>{driver.email}</p>
            </div>
            <div className='w-50'>
              <p>
                <strong>Address</strong>
              </p>
              <p className="mb-4">{addressDisplay}</p>

              <p>
                <strong>Phone { phonePreferred && "(Preferred Contact)"}</strong>
              </p>
              <p className='mb-0'>{driver.phone}</p>
            </div>
          </div>
        </Col>
      </Row>

      <PolicyTerm quote={quote}/>
    </>
  );
}
