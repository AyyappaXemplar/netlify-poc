import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { getTimestamp } from "../../../services/timestamps";

const DriverDetails = ({ driver, updateParentState }) => {

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

  function findDriverRelationshipStatus() {
    if (!driver?.policy_holder_relationship) {
      return []
    } else {
      const relatioshipStatusOpt = policyRelationshipsData.find(option => option.value === driver.policy_holder_relationship)
      return [relatioshipStatusOpt]
    }
  }

  return (
    <>
      <Container>
        <FormContainer bootstrapProperties={{ md: 6 }}>
          <Row className="mb-4">
            <Col>
              <h1>Drive Info</h1>
            </Col>
          </Row>

          <Form.Label>Driver Name</Form.Label>
          <div className="mb-3 d-flex flex-sm-row flex-column">
            <Form.Control
              className="mr-2"
              type="input"
              placeholder="First name"
              value={driver.first_name}
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
              value={driver.last_name}
              onChange={(e) => {
                e.persist();
                return updateParentState(e.target.value, "last_name");
              }}
            />
          </div>
          <Form.Label>What is your Date of Birth?</Form.Label>
          <input
            className="rounded custom-radio-container font-weight-light mb-4"
            type="date"
            value={driver.birthday}
            onChange={(event) => {
              event.persist();
              let timestamp = getTimestamp(event.target.value);
              return updateParentState(timestamp, "birthday");
            }}
          />

          <Form.Label>
            What is your relationship to the policy holder (John Doe)?
          </Form.Label>
          <CustomSelect
            options={policyRelationshipsData}
            wrapperClassNames={"width-100 mb-3"}
            onChange={(e) => {
              return updateParentState(e[0].value, "policy_holder_relationship");
            }}
            values={findDriverRelationshipStatus()}
          ></CustomSelect>

          <Form.Label>What is your marital status?</Form.Label>
          <CustomSelect
            options={maritalData}
            wrapperClassNames={"width-100 mb-4"}
            values={[maritalData.find(option => option.value === driver.marital_status)]}
            onChange={(event) => {
              return updateParentState(event[0].value, "marital_status");
            }}
          />

          <Form.Label>What is your occupation?</Form.Label>
          <Form.Control
            type="input"
            placeholder="Web Developer"
            value={driver.occupation}
            onChange={(e) => {
              updateParentState(e.target.value, "occupation");
            }}
          />
        </FormContainer>
      </Container>
    </>
  );
};

export default DriverDetails;
