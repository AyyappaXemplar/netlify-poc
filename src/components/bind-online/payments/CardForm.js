import React, { useState } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import icon_cc from "../../../images/icon_creditcards.svg";
import CustomSelect from "../../forms/CustomSelect";

const CardForm = () => {
    const [newAddressState, updateNewAddressState] = useState(false);
    
    const statesdata = [
        {label: "IL",        value: "il",        index: 0},
        {label: "MI",    value: "mi",    index: 1},
        {label: "IN", value: "in", index: 2},
      ];
  return (
    <div className="mt-5">
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
      <Form.Group>
        <Row>
          <Col>
            <hr />
            <p>
              <strong>Billing</strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="radio"
              name="address"
              id="address"
              className="mr-3"
              checked
            />
            <label htmlFor="address">
              Address is the same as policy (123 Main St.)
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input type="radio" name="address" id="address" className="mr-3" />
            <label htmlFor="address">Enter new billing address</label>
          </Col>
        </Row>
              {/** hidden form */}
              
<section>

        <Row className={"mt-3 p-1"}>
          <Col>
            <Form.Group>
              <Form.Control type="name" placeholder="first name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control type="name" placeholder="last name" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control type="text" placeholder="Address" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="name"
                placeholder="Apartment, suite, unit, building, floor, etc. - Optional"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Row>
            <Col xs={5}>
              <Form.Control type="text" placeholder="city"/>
            </Col>
            <Col xs={3}>
            
            <CustomSelect options={statesdata} className="newAddre" placeholder="state"/>
            </Col>
            <Col xs={4}>
              <Form.Control type="text" placeholder="zip"/>
            </Col>
          </Row>
              </Form.Group>
              

</section>

      </Form.Group>
    </div>
  );
};

export default CardForm;
