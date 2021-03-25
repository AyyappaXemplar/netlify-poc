import React from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import icon_cc from "../../../images/icon_creditcards.svg";
import payment from 'payment';

const CardForm = ({ creditCard, setCreditCard }) => {

  function formatInput(name, value, element) { 
    
    switch (name) {
      case "date":
        payment.formatCardExpiry(element)
        break;
      case "cvv":
        payment.formatCardCVC(element);
        break;

      case "number":
        payment.formatCardNumber(element);
        break;
    
      default:
        break;
    }
  }

  function changeCreditCard(event) {
    const { value, name } = event.target;
    formatInput(name, value, event.target);
    setCreditCard(prevCard => ({...prevCard, [name]: value }))
  }

  return (
    <div className="mb-4">
     <Row>
       <Col lg={6}>
         <Form.Group>
           <Form.Label>First Name</Form.Label>
           <Form.Control type="name" name="first_name" value={creditCard.name}
              placeholder="John" onChange={changeCreditCard} />
        </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
           <Form.Control type="name" name="last_name" value={creditCard.name}
             placeholder="Doe" onChange={changeCreditCard} />
         </Form.Group>
       </Col>
     </Row>
      <Row>
        <Col lg={6}>
          <Row>
          <Form.Group className="col-6 pr-0">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="1111 1111 1111 111"
                name="number" value={creditCard.number} onChange={changeCreditCard} />
               <Image src={icon_cc} className="mt-2"/>
          </Form.Group>
            <Form.Group className="col-3 pr-0">
            <Form.Label>Exp. Month</Form.Label>
            <Form.Control type="text" placeholder="MM"
              name="exp_month" value={creditCard.exp_month} onChange={changeCreditCard} maxLength="2"/>
            </Form.Group>
             
            <Form.Group className="col-3 pr-0">
            <Form.Label>Exp. Year</Form.Label>
            <Form.Control type="text" placeholder="YY"
              name="exp_year" value={creditCard.exp_year} onChange={changeCreditCard} maxLength="2"/>
            </Form.Group>
           
          </Row>
        </Col>
        <Col className="col-4 mb-12">
        <Form.Group>
            <Form.Label>Security Code</Form.Label>
            <Form.Control type="text" placeholder="CVV" maxLength="4" minLength="3"
              name="cvv" value={creditCard.cvv} onChange={changeCreditCard} />
            </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default CardForm;
