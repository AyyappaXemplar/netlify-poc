import React, { useState } from "react";
import { Row, Col, Image, Container, Form, Tabs, Tab } from "react-bootstrap";
import CardForm from "./CardForm";
import secureIcon from "../../../images/secure_logo.svg";
import Address from "./Address";
import { BankTransferForm } from "./BankTransferForm";

const PaymentForm = () => {
  const [key, setKey] = useState("home");
  
  /** TO DO: replace with image */
  const hr_style = {
    position: "absolute",
    background: "#f16322",
    height: "3px",
    width: "30px",
    borderRadius: "30%",
  };


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
                  >&nbsp;</span>
                </div>
                <BankTransferForm />
              </Tab>
            </Tabs>
            <Address />
          </Form>
        </Col>
      </Row>
  
    </Container>
  );
};

export default PaymentForm;
