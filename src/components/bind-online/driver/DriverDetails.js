import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import updateState from "../../../utilities/updateState"

const DriverDetails = ({ driver }) => {
  
/*  state */  
  const [DriverNameState, updateDriversNameState] = useState({
    first_name: driver.first_name,
    last_name: driver.last_name,
    middle_initial: driver.middle_initial,
  });

  const [DobState, updateDobState] = useState(driver.birthday);

  const [maritalStatusState, updateMaritalStatusState] = useState(driver.marital_status)

  const [policyRelationshipState, updatePolicyRelationshipState] = useState("insured");

  const [occupationState, updateOccupationState] = useState(
    {
      occupation:driver.occupation ? driver.occupation : "web developer"
    }
  )

/*  handlers */
  const updateDriverNameObj = (event, key) => {
    event.persist();
    updateDriversNameState((prevState) => {
      return updateState(prevState, event, key)
    });
  };

  const updateOccupationObj = (event, key) => { 
    event.persist()
    updateOccupationState((prevState) => {
      return updateState(prevState, event, key)
    });
  } 

  // form data / stuff
  const maritalData = [
    {
      label: "married",
      value: "married",
      index: 0,
    },
    {
      label: "Single",
      value: "Single",
      index: 1,
    },
  ];

  const policyRelationshipsData = [
    {
      label: "insured",
      value: "insured",
      index: 0,
    },
    {
      label: "spouse",
      value: "spouse",
      index: 1,
      
    },
    {
      label: "dependent",
      value: "dependent",
      index: 1,
      
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
              <Form.Control
                type="input"
                placeholder="First name"
                value={DriverNameState.first_name}
                onChange={(e) => {
                  return updateDriverNameObj(e, "first_name");
                }}
              />
            </Col>
            <Col xs={12} md={2}>
              <Form.Control
                type="input"
                placeholder="MI"
                value={DriverNameState.middle_initial}
                onChange={(e) => {
                  return updateDriverNameObj(e, "middle_initial");
                }}
              />
            </Col>
            <Col xs={12} md={5}>
              <Form.Control
                type="input"
                placeholder="Last Name"
                value={DriverNameState.last_name}
                onChange={(e) => {
                  return updateDriverNameObj(e, "last_name");
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
              <Form.Control
                type="input"
                placeholder="07/27/1996"
                value={DobState}
                onChange={(e) => {
                  return updateDobState(e.target.value);
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
                onChange={(event) => {
                  return updateMaritalStatusState(event[0].value)
                }}
                values={[{label:maritalStatusState, value: maritalStatusState }]}
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
                onChange={(e) => { return updatePolicyRelationshipState(e[0].value) }}
                values={[{label:policyRelationshipState, value: policyRelationshipState }]}
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
                value={occupationState.occupation}
                onChange={(e) => {
                  return updateOccupationState(e.target.value);
                }} />
            </Col>
          </Row>
        </FormContainer>
      </Container>
    </>
  );
};

export default DriverDetails;
