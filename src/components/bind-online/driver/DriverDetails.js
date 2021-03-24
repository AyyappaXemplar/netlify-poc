import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import InputMask from "react-input-mask"

import CustomSelect              from "../../forms/CustomSelect";
import Radio                     from "../../forms/Radio";
import FormContainer             from "../../shared/FormContainer";

const DriverDetails = ({ driver, updateParentState, updateExcludeFromPolicy }) => {
  const [birthday, setBirthday] = useState("")

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

  const excludedDriverOptions = [
    {label: "Yes", value: false},
    {label: "No",  value: true}
  ];

  function findDriverRelationshipStatus() {
    if (!driver?.policy_holder_relationship) {
      return []
    } else {
      const relatioshipStatusOpt = policyRelationshipsData.find(option => option.value === driver.policy_holder_relationship)
      return [relatioshipStatusOpt]
    }
  }

  function findMaritalStatus() {
    if (!driver?.marital_status) {
      return []
    } else {
      const option = maritalData.find(option => option.value === driver.marital_status)
      return [option]
    }
  }

  function changePolicyHolderRelationShip(event) {
    if (!event[0]) return
    updateParentState(event[0].value, "policy_holder_relationship");
  }

  function changeMaritalStatus(event) {
    if (!event[0]) return
    updateParentState(event[0].value, "marital_status");
  }

  return (
    <FormContainer bootstrapProperties={{ lg:6 }}>
      <Row className="mb-4">
        <Col>
          <h2>Driver Info</h2>
        </Col>
      </Row>

      <Form.Label>Driver Name</Form.Label>
      <div className="mb-3 d-flex flex-sm-row flex-column">
        <Form.Control
          className="mr-2"
          type="input"
          placeholder="First name"
          value={driver.first_name ? driver.first_name : ""}
          onChange={(e) => {
            e.persist();
            return updateParentState(e.target.value, "first_name");
          }}
        />

        {/* <Form.Control
          type="input"
          className="mr-2 mb-3"
          xs={2}
          placeholder="MI"
          value={driver.middle_initial}
          onChange={(e) => {
            e.persist();
            return updateParentState(e.target.value, "middle_initial");
          }}
          name={"middle_initial"}
        /> */}

        <Form.Control
          type="input"
          placeholder="Last Name"
          value={driver.last_name ? driver.last_name : ""}
          onChange={(e) => {
            e.persist();
            return updateParentState(e.target.value, "last_name");
          }}
        />
      </div>
      <Form.Label>What is your Date of Birth?</Form.Label>
      <InputMask
        className="rounded custom-radio-container font-weight-light mb-4"
        type="input"
        mask="99/99/9999"
        alwaysShowMask={true}
        maskChar="-"
        value={birthday}
        onChange={(event) => {
          event.persist();
          setBirthday(event.target.value)
          return updateParentState(event.target.value, "birthday");
        }}
      />

     { !driver.policyholder && <><Form.Label>
        What is your relationship to the policy holder?
      </Form.Label>
      <CustomSelect
        options={policyRelationshipsData}
        wrapperClassNames={"width-100 mb-3"}
        onChange={changePolicyHolderRelationShip}
        values={findDriverRelationshipStatus()}
      /></>}

      <Form.Label>What is your marital status?</Form.Label>
      <CustomSelect
        options={maritalData}
        wrapperClassNames={"width-100 mb-4"}
        values={findMaritalStatus()}
        onChange={changeMaritalStatus}
      />

      <div className="mb-3">
        <Form.Label>What is your occupation?</Form.Label>
        <Form.Control
          type="input"
          placeholder="Web Developer"
          value={driver.occupation ? driver.occupation : ""}
          onChange={(e) => {
            updateParentState(e.target.value, "occupation");
          }}
        />
      </div>

      <Form.Label>Would you like to exclude this driver from the policy?</Form.Label>
      <div className="mb-3 d-flex flex-sm-row flex-column">
        { excludedDriverOptions.map( option => (
          <Radio
            disabled={driver.policyholder}
            key={`included_in_policy-${option.label}`}
            type='radio'
            label={option.label}
            selected={driver.included_in_policy === option.value}
            inline={true}
            onChange={() => updateExcludeFromPolicy(option.value)}
          />
        )) }
      </div>
    </FormContainer>
  );
};

export default DriverDetails;
