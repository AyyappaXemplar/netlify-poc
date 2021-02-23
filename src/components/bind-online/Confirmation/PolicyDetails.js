import ReactStars           from "react-rating-stars-component";
import React                from 'react';
import { Row, Col, Image }  from 'react-bootstrap';

import policyLogo           from '../../../images/FCIC-Logo.png'; 

const PolicyDetails = () => {
  return (
    <Row className="justify-content-center">
      <Col lg={6} className={"bg-white rounded shadow p-5"}>
        <Row>
          <Col lg={3} className={"mr-2"}>
            <Image src={policyLogo} width="120px" height="60px"/>
        
          </Col>
          <Col lg={8} className="">
            <strong>First Chicago Insurance Company</strong>
            <ReactStars
              count={5}
              // onChange={() => {console.log('stars change')}}
              isHalf={true}
              size={24}
              activeColor="#ffd700"
              value={4.5}
              edit={false}
            />
          </Col>
        </Row>
        <Row>
          <Col className="py-3">Welcome to First Chicago Insurance company. Your policy is all set. Please review the following details below regarding the specifics on policy number, effective date, and all coverage documents.</Col>
        </Row>
        <Row>
          <Col className="border-top border-bottom py-3">
            <p><strong>Policy Number</strong></p>
            <p className="mb-0">RQS15894B3G</p>
          </Col>
          <Col className="border-top border-bottom py-3">
            <p><strong>Effective Date</strong></p>
            <p className="mb-0">01/12/2020 - 07/12/2020</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p><strong>Coverage Documents</strong></p>
            <p className="mb-0">RQS15894B3G</p>
          </Col>
          <Col className="py-3">
            <p>&nbsp;</p>
            <p className="mb-0">01/12/2020 - 07/12/2020</p>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PolicyDetails
