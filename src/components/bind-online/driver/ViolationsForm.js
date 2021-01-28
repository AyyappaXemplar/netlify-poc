import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CustomSelect from "../../forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import getDate, { getTimestamp } from "../../../services/timestamps";

const ViolationsForm = ({ driver, updateParentState }) => {
  const incidentsOptions = [
    {
      label: "Accident",
      value: "Accident",
      index: 1,
    },
    {
      label: "On Purpose",
      value: "On Purpose",
      index: 2,
    },
  ];

  const incidentsDescOptions = [
    {
      label: "At-Fault-Incident",
      value: "At-Fault-Incident",
      index: 1,
    },
    {
      label: "His/Her Fault",
      value: "His/Her Fault",
      index: 2,
    },
  ];

  return (
    <>
      <Row className={"mb-3 "}>
        <Col>
          <Form.Label>What is the date of the incident?</Form.Label>
          <input
            type="date"
            // TO DO: wire this up properly
            value={getDate(driver.license_issued_at)}
            onChange={(event) => {
              let timestamp = getTimestamp(event.target.value);
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
              return false;
            }}
            values={[{ label: "none", value: "none" }]}
          />
        </Col>
      </Row>
      <Row className={"mb-3"}>
        <Col>
          <p>What type of incident?</p>
          <CustomSelect
            options={incidentsDescOptions}
            onChange={(e) => {
              return false;
            }}
            values={[{ label: "none", value: "none" }]}
          />
        </Col>
      </Row>

      <Row>
        <Col className={"d-flex justify-content-between"}>
          <a href="#">Cancel</a>
          <Button>Add Incident</Button>
        </Col>
      </Row>
    </>
  );
};

export default withTranslation(["drivers"])(ViolationsForm);
