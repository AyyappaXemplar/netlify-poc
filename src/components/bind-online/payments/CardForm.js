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
        <Col lg={6} className="pr-lg-1">
         <Form.Group>
           <Form.Label>First Name</Form.Label>
           <Form.Control type="name" name="first_name" value={creditCard.name}
              placeholder="John" onChange={changeCreditCard} />
        </Form.Group>
        </Col>
        <Col lg={6} className="pl-lg-1">
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
           <Form.Control type="name" name="last_name" value={creditCard.name}
             placeholder="Doe" onChange={changeCreditCard} />
         </Form.Group>
       </Col>
     </Row>
      <Row>
        <Col md={6} lg={6} xl={6} className="pr-md-1">
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="1111 1111 1111 111"
                name="number" value={creditCard.number} onChange={changeCreditCard} />
            <Image src={icon_cc} className="mt-2"/>
          </Form.Group>
        </Col>
        
        <Col md={3} lg={6} xl={3} className="px-md-1 pr-lg-3 px-xl-1">
          <Form.Group>
          <Form.Label>Exp. Month</Form.Label>
          <Form.Control type="text" placeholder="MM"
            name="exp_month" value={creditCard.exp_month} onChange={changeCreditCard} maxLength="2"/>
          </Form.Group>
        </Col>
          
        <Col md={3} lg={6} xl={3} className="pl-md-1 pr-lg-1 pl-lg-3 pr-xl-3 pl-xl-1">
          <Form.Group>
            <Form.Label>Exp. Year</Form.Label>
            <Form.Control type="text" placeholder="YY"
              name="exp_year" value={creditCard.exp_year} onChange={changeCreditCard} maxLength="2"/>
          </Form.Group>
        </Col>
        
        <Col md={4} lg={6} xl={4} className="pl-lg-1 pl-xl-3">
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