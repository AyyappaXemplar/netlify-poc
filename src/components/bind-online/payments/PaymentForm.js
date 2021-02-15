import React, { useState } from "react";
import { Row, Col, Image, Container, Form, Tabs, Tab } from "react-bootstrap";
import CardForm from "./CardForm";
import secureIcon from '../../../images/secure_logo.svg'
const PaymentForm = () => {
  const [key, setKey] = useState("home");
  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col
          lg={6}
          className="justify-content-center bg-white rounded shadow-sm"
              >
            <Row className="justify-content-between align-items-center">
                <Col xs={9}><h2 className="m-4">Payment</h2></Col>
                <Col  xs={3}><Image src={secureIcon}/></Col>
            </Row>
          
          <Form className="p-4">
            <Tabs
              id="payments-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              variant="pills"
              className="row px-3"
            >
              <Tab eventKey="home" title="Card">
                <CardForm />
              </Tab>
              <Tab eventKey="profile" title="Bank Transfer">
                {/* <Sonnet /> */}
              </Tab>
            </Tabs>{" "}
          </Form>
        </Col>
      </Row>{" "}
    </Container>
  );
};

export default PaymentForm;
