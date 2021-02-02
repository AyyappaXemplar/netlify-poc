import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import CustomSelect from "../../forms/CustomSelect";
// import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import getDate, { getTimestamp } from "../../../services/timestamps";

import violationsDesc from "../../../data/violationsDesc";
import incidentsOptions from "../../../data/incidentsOptions";

const ViolationsForm = ({ driver, addViolation }) => {
  const blankViolation = {
    type: "",
    date: "",
    description: "",
  };
  const [violationsData, updateViolationsData] = useState(violationsDesc);
  const [violation, updateViolation] = useState(blankViolation);

  const filterDescriptions = (array, key) => {
    const reducedArray = array.filter((item) => {
      if (item.data !== undefined && item.data === key) {
        return item;
      } else {
        return false;
      }
    });

    return reducedArray;
  };

  return (
    <div className={"bg-lighter"} style={{ padding: "20px" }}>
      <Form.Label>What is your license state?</Form.Label>
      <input
        className="custom-radio-container rounded mb-3"
        type="date"
        name={"date"}
        // TO DO: wire this up properly
        value={getDate(driver.license_issued_at)}
        onChange={(event) => {
          let timestamp = getTimestamp(event.target.value);
          updateViolation((prevViolation) => {
            return { ...prevViolation, date: timestamp };
          });
          return false;
        }}
      />

      <Form.Label>What type of incident?</Form.Label>
      <CustomSelect
        options={incidentsOptions}
        onChange={(e) => {
          updateViolationsData(filterDescriptions(violationsDesc, e[0].key));
          updateViolation((prevViolation) => {
            return { ...prevViolation, type: e[0].key };
          });
        }}
        wrapperClassNames="mb-3"
        values={[{ label: "none", value: "none" }]}
      />

      <Form.Label>Incident description</Form.Label>
      <CustomSelect
        wrapperClassNames="mb-4"
        options={violationsData}
        onChange={(e) => {
          updateViolation((prevViolation) => {
            return { ...prevViolation, description: e[0].value };
          });
        }}
        values={[{ label: "none", value: "none" }]}
        name={"description"}
      />

      <Row>
        <Col className={"d-flex justify-content-between"}>
          <span>Cancel</span>
          <Button onClick={() => addViolation(violation)} className={"rounded-pill"}>Add Incident</Button>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation(["drivers"])(ViolationsForm);
