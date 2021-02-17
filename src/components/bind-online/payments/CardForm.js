import React from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import icon_cc from "../../../images/icon_creditcards.svg";


const CardForm = () => {
  return (
    <div className="mt-4">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="john Doe" className="mb-4" />
        <Row>
          <Col sm={12} md={12} lg={6}>
            {" "}
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="number" placeholder="1111 1111 1111 111" />
          </Col>
          <Col sm={12} md={12} lg={3}>
            {" "}
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="number" placeholder="MM/DD/YY" />
          </Col>
          <Col sm={12} md={12} lg={3} className="mb-2">
            {" "}
            <Form.Label>Security Code</Form.Label>
            <Form.Control type="number" placeholder="CVV" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Image src={icon_cc} />
          </Col>
        </Row>
      </Form.Group>
    
    </div>
  );
};

export default CardForm;
