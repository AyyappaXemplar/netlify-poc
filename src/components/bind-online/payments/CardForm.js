import React from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import icon_cc from "../../../images/icon_creditcards.svg";

const CardForm = ({ creditCard, setCreditCard }) => {
  function changeCreditCard(event) {
    const { value, name } = event.target
    setCreditCard(prevCard => ({...prevCard, [name]: value }))
  }

  return (
    <div className="mb-4">
      {/* <Row> */}
      {/*   <Col lg={6}> */}
      {/*     <Form.Group> */}
      {/*       <Form.Label>Name</Form.Label> */}
      {/*       <Form.Control type="name" name="first_name" value={creditCard.name} */}
      {/*         placeholder="john Doe" onChange={changeCreditCard} /> */}
      {/*     </Form.Group> */}
      {/*   </Col> */}
      {/* </Row> */}
      <Row>
        <Col lg={6}>
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="number" placeholder="1111 1111 1111 111"
              name="number" value={creditCard.number} onChange={changeCreditCard}/>
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="number" placeholder="MM/DD/YY"
              name="date" value={creditCard.date} onChange={changeCreditCard} />
          </Form.Group>
        </Col>
        <Col lg={3} className="mb-2">
          <Form.Group>
            <Form.Label>Security Code</Form.Label>
            <Form.Control type="number" placeholder="CVV"
              name="cvv" value={creditCard.cvv} onChange={changeCreditCard} />
            </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src={icon_cc} />
        </Col>
      </Row>

    </div>
  );
};

export default CardForm;
