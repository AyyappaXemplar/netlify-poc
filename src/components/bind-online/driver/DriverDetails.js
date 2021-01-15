import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";


const DriverDetails = () => {

/*  state */  
  const [DriverNameState, updateDriversNameState] = useState({
    first_name: "",
    last_name: "",
    middle_initial: "",
  });

  const [DobState, updateDobState] = useState({
    birthday: "",
  });

  const [maritalStatusState, updateMaritalStatusState] = useState(
    {
      marital_status: ""
    }
  )

  const [policyRelationshipState, updatePolicyRelationshipState] = useState({
    policy_relationships: {
      policy_holder: "",
    }
  });

  const [occupationState, updateOccupationState] = useState(
    {
      occupation:""
    }
  )

/*  handlers */
  const updateDriverNameObj = (event, key) => {
    event.persist();
    updateDriversNameState((prevState) => {
      let nameEntry = { ...prevState };
      nameEntry[key] = event.target.value;
      console.log('name entry:', nameEntry)
      return nameEntry;
    });
  };

  const updateBirthdayObj = (event, key) => {
    event.persist();
    updateDobState((prevState) => {
      let dobEntry = { ...prevState };
      dobEntry[key] = event.target.value;
      console.log("dob", dobEntry)
      return dobEntry;
    });
  };

  const updateMaritalStatusObj = (event, key) => {

    const status = event[0];

    updateMaritalStatusState((prevState) => {
      let marriedStatus = { ...prevState };
      marriedStatus[key] = status.value;
      console.log("married status", marriedStatus)
      return marriedStatus;
    });
  };

  const updatePolicyRelationshipObj = (event) => {
    const policySelection = event[0];
    updatePolicyRelationshipState((prevState) => { 
      let pr = prevState['policy_relationships']
      pr = policySelection.value;
      console.log("policy relationships", pr)
      return pr
    })

  }

  const updateOccupationObj = (event) => { 
    event.persist()
    updateOccupationState((prevState) => {
      let occProp = { ...prevState };
      occProp["occupation"] = event.target.value;
      console.log("occupation", occProp)
      return occProp;
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
                value={DriverNameState.middle_initial}
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
                value={DobState.birthday}
                onChange={(e) => {
                  return updateBirthdayObj(e, "birthday");
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
                  return updateMaritalStatusObj(event, "marital_status")
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
                onChange={(e) => {return updatePolicyRelationshipObj(e) } }
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
                  return updateOccupationObj(e);
                }} />
            </Col>
          </Row>
        </FormContainer>
      </Container>
    </>
  );
};

export default DriverDetails;
