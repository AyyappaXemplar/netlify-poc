import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import CustomSelect from "../../forms/CustomSelect";
// import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import InputMask from "react-input-mask"

import violationsDesc   from "../../../data/violationsDesc";
import incidentsOptions from "../../../data/incidentsOptions";

const ViolationsForm = ({ driver, addViolation, updateShowViolationsForm, showViolationsForm }) => {
  const blankViolation = { type: "", date: "", description: "" };
  const [violationsData, setViolationsData] = useState(violationsDesc);
  const [violation, setViolation] = useState(blankViolation);

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

  const changeIncidentType = (value) => {   
    setViolationsData(filterDescriptions(violationsDesc, value[0].key))
  }

  const changeDescription = (value) => {
    setViolation((prevViolation) => {
      return { ...prevViolation, type: value[0].type, description: value[0].label };
    });
  }

  return (
    <div className={"bg-lighter"} style={{ padding: "20px" }}>
      <Form.Label>What is the date of the incident?</Form.Label>
      <InputMask
        className="rounded custom-radio-container font-weight-light mb-4"
        type="input"
        mask="99/99/9999"
        maskChar="-"
        placeholder="mm/dd/yyyy"
        value={violation.date}
        onChange={(event) => {
          setViolation({...violation, date: event.target.value })
        }}
      />

      <Form.Label>What type of incident?</Form.Label>
      <CustomSelect
        options={incidentsOptions}
        onChange={changeIncidentType}
        wrapperClassNames="mb-3"
        values={[{ label: "none", value: "none" }]}
      />

      <Form.Label>Incident description</Form.Label>
      <CustomSelect
        wrapperClassNames="mb-4"
        options={violationsData}
        onChange={changeDescription}
        values={[{ label: "none", value: "none" }]}
        name={"description"}
      />

      <Row>
        <Col className={"d-flex justify-content-between"}>
          <button
            type="button"
            className="btn btn-link text-info"
            onClick={() => updateShowViolationsForm(false)}
          >
            Cancel
          </button>


          <Button
            onClick={() => {
              updateShowViolationsForm(false);
              addViolation(violation);
            }}
            className={"rounded-pill"}
          >
            Add Incident
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation(["drivers"])(ViolationsForm);
