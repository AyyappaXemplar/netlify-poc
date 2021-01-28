import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import getDate, { getTimestamp } from "../../../services/timestamps";

const ViolationsForm = ({driver, updateParentState}) => {
  return (

      <Row>
        
          <Col>
          <Form.Label>What is the date of the incident?</Form.Label>
            <input
                  type="date"
                  // TO DO: wire this up properly
              value={getDate(driver.license_issued_at)}
              onChange={(event) => {
                let timestamp = getTimestamp(event.target.value);
                return false
              }}
            />
          </Col>
        </Row>

  );
};

export default withTranslation(["drivers"])(ViolationsForm);
