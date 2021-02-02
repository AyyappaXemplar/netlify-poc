import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { getTimestamp } from "../../../services/timestamps";

const DriverDetails = ({ driver, updateParentState }) => {
  // form data / stuff
  const maritalData = [
    {label: "Married",  value: "married",  index: 0},
    {label: "Single",   value: "single",   index: 1},
    {label: "Divorced", value: "divorced", index: 2},
    {label: "Widowed",  value: "widowed",  index: 3}
  ];

  const policyRelationshipsData = [
    {label: "Me",        value: "me",        index: 0},
    {label: "Spouse",    value: "spouse",    index: 1},
    {label: "Dependent", value: "dependent", index: 2},
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
              <Form.Control
                type="input"
                placeholder="First name"
                value={driver.first_name}
                onChange={(e) => {
                  e.persist();
                  return updateParentState(e.target.value, "first_name");
                }}
              />
            </Col>
            {/*<Col xs={12} md={2}>
              <Form.Control
                type="input"
                placeholder="MI"
                value={driver.middle_initial}
                onChange={(e) => {
                  e.persist();
                  return updateParentState(e.target.value, "middle_initial");
                }}
              />
            </Col>*/}
            <Col xs={12} md={5}>
              <Form.Control
                type="input"
                placeholder="Last Name"
                value={driver.last_name}
                onChange={(e) => {
                  e.persist();
                  return updateParentState(e.target.value, "last_name");
                }}
              />
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
              <input
                className='rounded custom-radio-container font-weight-light'
                type="date"
                value={driver.birthday}
                onChange={(event) => {
                  event.persist();
                  let timestamp = getTimestamp(event.target.value);
                  return updateParentState(timestamp, "birthday");
                }}
              />
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
                values={[maritalData.find(option => option.value === driver.marital_status)]}
                onChange={(event) => {
                  return updateParentState(event[0].value, "marital_status");
                }}
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
                onChange={(e) => {
                  return updateParentState(e[0].value, "policy_holder_relationship");
                }}
                values={[policyRelationshipsData.find(option => option.value === driver.policy_holder_relationship)]}
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
              <Form.Control
                type="input"
                placeholder="Web Developer"
                value={driver.occupation}
                onChange={(e) => {
                  updateParentState(e.target.value, "occupation");
                }}
              />
            </Col>
          </Row>
        </FormContainer>
      </Container>
    </>
  );
};

export default DriverDetails;
