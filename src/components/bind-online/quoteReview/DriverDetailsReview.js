import React from "react";
import FormContainer from "../../shared/FormContainer";
import { Row, Col } from "react-bootstrap";
export default function DriverDetailsReview() {
  return (
    <>
      <Row className="justify-content-center">
        <Col md={6} className={"d-flex justify-content-between"}>
          <p>
            <strong>Driver Details</strong>
          </p>
          <p>
            <strong>Edit</strong>
          </p>
        </Col>
      </Row>
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <Row>
          <Col xs={12} md={6}>
            <p>
              <strong>Policy Holder</strong>
            </p>
            <p className={"mb-5"}>John Lee Doer</p>
            <p>
              <strong>Email (Preferred Contact)</strong>
            </p>
            <p>johnleedoe@email.com</p>
          </Col>
          <Col xs={12} md={6}>
            <p>
              <strong>Address</strong>
            </p>
            <p className={"mb-4"}>123 Michigan Ave Street Chicago, IL 60610</p>

            <p>
              <strong>Phone</strong>
            </p>
            <p>111-111-1111</p>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}
