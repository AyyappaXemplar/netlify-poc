import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
export default function driverDetails() {
  const maritalData = [
    {
      label: "married",
      value: "married",
      index: 1,
    },
    {
      label: "Single",
      value: "Single",
      index: 2,
    },
  ];

  const policyRelationshipsData = [
    {
      label: "married",
      value: "married",
      index: 1,
    },
    {
      label: "Single",
      value: "Single",
      index: 2,
    },
  ];

  return (
    <>
      <Container>
        <FormContainer bootstrapProperties={{ md: 6 }}>
          <Row>
            <Col>
              <h1>Drive Info</h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <strong>Driver Name</strong>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={5}>
              <Form.Control placeholder="First name" />
            </Col>
            <Col xs={12} md={2}>
              <Form.Control placeholder="MI" />
            </Col>
            <Col xs={12} md={5}>
              <Form.Control placeholder="Last name" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <strong>Date of Birth</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control placeholder="07/27/1996" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <strong>Marital Status</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomSelect
                options={maritalData}
                wrapperClassNames={"width-100"}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <strong>Policy Relationships</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomSelect
                options={policyRelationshipsData}
                wrapperClassNames={"width-100"}
              ></CustomSelect>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <strong>Occupation</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control placeholder="web developer" />
            </Col>
          </Row>
        </FormContainer>
      </Container>
    </>
  );
}
