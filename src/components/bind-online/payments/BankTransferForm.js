import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export const BankTransferForm = () => {
  return (
    <div className="mt-4">
      <Form.Group>
        <Form.Label>Payment Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Row className="mb-3">
          <Col xs={12} md={12} lg={9}>
            <Form.Control type="text" placeholder="Address" />
          </Col>
          <Col xs={12} md={12} lg={3}>
            <Form.Control type="text" placeholder="Apt" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={5}>
            {" "}
            <Form.Control type="text" placeholder="City" />
          </Col>
          <Col xs={12} md={12} lg={2}>
            {" "}
            <Form.Control type="text" placeholder="Address" />
          </Col>
          <Col xs={12} md={12} lg={5}>
            {" "}
            <Form.Control type="text" placeholder="Zip Code" />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Routing Number</Form.Label>
        <Form.Control type="text" placeholder="22227654" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Account Number</Form.Label>
        <Form.Control type="text" placeholder="22227654" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Account Number</Form.Label>
        <Form.Control type="text" placeholder="22227654" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bank Name</Form.Label>
        <Form.Control type="text" placeholder="Bank of America" />
      </Form.Group>
    </div>
  );
};
