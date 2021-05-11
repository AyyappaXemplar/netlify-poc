import React                   from "react";
import { Row, Col } from "react-bootstrap";

import getDate from "../../../services/timestamps";

export default function DriverDetailsReview({quote}) {

  return (
    <Row>
      <Col>
        <div className='bg-white rounded shadow-sm mb-5 p-4 d-flex justify-content-between'>
          <div className='w-50'>
            <p>
              <strong>Policy Term</strong>
            </p>
            <p className="mb-0">{quote.term.duration} months</p>
          </div>
          <div className='w-50'>
            <p>
              <strong>Effective Dates</strong>
            </p>
            <p className="mb-0">{getDate(quote.term.effective, 'MM/DD/YYYY')} - {getDate(quote.term.expires, 'MM/DD/YYYY')}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
}