import React, {useState} from 'react';
import { Row, Col, Form} from "react-bootstrap";
import CustomSelect from "../../forms/CustomSelect";

const Address = () => {
    const [showNewAddressForm, updateShowNewAddressForm] = useState(false);
    const statesdata = [
        { label: "IL", value: "il", index: 0 },
        { label: "MI", value: "mi", index: 1 },
        { label: "IN", value: "in", index: 2 },
      ];
    
      const handeleAddressRadio = (event) => {
        console.log(event.target.value)
        updateShowNewAddressForm(event.target.value);
      }
    return (
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
              onChange={e => handeleAddressRadio(e)}
            />
            <label htmlFor="address">
              Address is the same as policy (123 Main St.)
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="radio"
              name="address"
              id="address"
              className="mr-3"
              value={true}

              onChange={ e => handeleAddressRadio(e) }
            />
            <label htmlFor="address">Enter new billing address</label>
          </Col>
        </Row>
        {/** hidden form */}
        <section style={{display:`${showNewAddressForm === "true" ? "block" : "none"}`}}>
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
                <Form.Control type="text" placeholder="city" />
              </Col>
              <Col xs={3} className="p-0">
                <CustomSelect
                  options={statesdata}
                  className="newAddre"
                  placeholder="state"
                />
              </Col>
              <Col xs={4}>
                <Form.Control type="text" placeholder="zip" />
              </Col>
            </Row>
          </Form.Group>
        </section>
      </Form.Group>
    )
}

export default Address
