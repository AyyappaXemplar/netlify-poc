import React from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import icon_cc from "../../../images/icon_creditcards.svg";


const CardForm = ({ creditCard, setCreditCard }) => {
  function changeCreditCard(event) {
    const { value, name } = event.target
    setCreditCard(prevCard => ({...prevCard, [name]: value }))
  }

  return (
    <div className="mt-4">
      <Form.Group>
        <Row>
          <Col lg={6}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" name="first_name" value={creditCard.name}
              placeholder="john Doe" onChange={changeCreditCard} className="mb-4" />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="number" placeholder="1111 1111 1111 111"
              name="number" value={creditCard.number} onChange={changeCreditCard}/>
          </Col>
          <Col lg={3}>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="number" placeholder="MM/DD/YY"
              name="date" value={creditCard.date} onChange={changeCreditCard} />
          </Col>
          <Col lg={3} className="mb-2">
            <Form.Label>Security Code</Form.Label>
            <Form.Control type="number" placeholder="CVV"
              name="cvv" value={creditCard.cvv} onChange={changeCreditCard} />
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
