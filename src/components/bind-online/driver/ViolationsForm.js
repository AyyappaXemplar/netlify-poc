import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import CustomSelect from "../../forms/CustomSelect";
// import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import getDate, { getTimestamp } from "../../../services/timestamps";

import violationsDesc from '../../../data/violationsDesc'
import incidentsOptions from '../../../data/incidentsOptions'

const ViolationsForm = ({ driver, updateParentState, displayForm, addViolation }) => {
  const blankViolation = {
    date: "",
    description:""
  }
  const [violationsData, updateViolationsData] = useState(violationsDesc);
  const [violation, updateViolation] = useState(blankViolation)


  const filterDescriptions = (array, key) => {
      const reducedArray = array.filter((item) => {
        if (item.data !== undefined && item.data === key) {
          return item
        }
        else {
          return false
        }
      })

    return reducedArray
  }


  return (
    <div style={{ display: displayForm ? "block" : "none" }}>
      <p>What is the date of the incident?</p>
      <Row className={"mb-3 "}>
        <Col>
          <input
            type="date"
            name={"date"}
            // TO DO: wire this up properly
            value={getDate(driver.license_issued_at)}
            onChange={(event) => {
              let timestamp = getTimestamp(event.target.value);
              updateViolation((prevViolation) => {
                  return {...prevViolation, date: timestamp}
              })
              return false;
            }}
          />
        </Col>
      </Row>
      <Row className={"mb-3"}>
        <Col>
          <p>What type of incident?</p>
          <CustomSelect
            options={incidentsOptions}
            onChange={(e) => {
              updateViolationsData(filterDescriptions(violationsDesc, e[0].key))
            }}
            values={[{ label: "none", value: "none" }]}
          />
        </Col>
      </Row>
      <Row className={"mb-3"}>
        <Col>
          <p>Incident description</p>
          <CustomSelect
            options={violationsData}
            onChange={(e) => {
              updateViolation((prevViolation) => {
                  return {...prevViolation, description: e[0].value}
              })
            }}
            values={[{ label: "none", value: "none" }]}
            name={"description"}
          />
        </Col>
      </Row>

      <Row>
        <Col className={"d-flex justify-content-between"}>
          <span>Cancel</span>
          <Button onClick={ () => addViolation(violation)}>Add Incident</Button>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation(["drivers"])(ViolationsForm);
