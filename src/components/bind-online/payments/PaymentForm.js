import React, { useState } from "react";
import { Row, Col, Image, Container, Form, Tabs, Tab } from "react-bootstrap";
import CardForm from "./CardForm";
import secureIcon from "../../../images/secure_logo.svg";
import CustomSelect from "../../forms/CustomSelect";
const PaymentForm = () => {
  const [key, setKey] = useState("home");
  const [showNewAddressForm, updateShowNewAddressForm] = useState(false);
  /** TO DO: replace with image */
  const hr_style = {
    position: "absolute",
    background: "#f16322",
    height: "3px",
    width: "30px",
    borderRadius: "30%",
  };

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
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col
          lg={6}
          className="justify-content-center bg-white rounded shadow-sm"
        >
          <Row className="justify-content-between align-items-center">
            <Col xs={9}>
              <h2 className="m-4">Payment</h2>
            </Col>
            <Col xs={3}>
              <Image src={secureIcon} />
            </Col>
          </Row>

          <Form className="p-4">
            <Tabs
              id="payments-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              variant="pills"
              className="row p-0"
            >
              <Tab
                eventKey="home"
                title="Card"
                tabClassName="border-0 rounded-0 pt-0 pb-2 px-3 col-2 bg-white shadow-none font-weight-bolder"
              >
                <div className="border-bottom">
                  <span
                    style={{ ...hr_style }}
                    className="border-bottom-danger pill-rounded"
                  ></span>
                </div>
                <CardForm />
              </Tab>
              <Tab
                eventKey="profile"
                title="Bank Transfer"
                tabClassName="border-0 rounded-0 pt-0 pb-2 px-0 col-3 bg-white shadow-none font-weight-bolder"
              >
                <div className="border-bottom">
                  <span
                    style={{ ...hr_style, marginLeft: "5rem" }}
                    className="border-bottom-danger pill-rounded"
                  ></span>
                </div>
                <CardForm />
              </Tab>
            </Tabs>{" "}
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
                    value={false}
      
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
                    <Col xs={3}>
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
          </Form>
        </Col>
      </Row>{" "}
    </Container>
  );
};

export default PaymentForm;
