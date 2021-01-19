import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
// import Radio from "../../forms/Radio";
import { withTranslation } from "react-i18next";
import updateState from "../../../utilities/updateState"

const LicenseInfo = ({ driver, t }) => {
  
  // temp vars TO DO: Address 
  const violations = driver.violations ? driver.violations : false;
  const licenseNumber = driver.license_number ? driver.license_number : "A456-placeholder";

  /* state const's */

  // is foreign license
  const [foreignLicenseState, updateForeignLicenseState] = useState(driver.international_license);

  // license status
  const [licenseStatusState, updateLicenseStatusState] = useState(driver.license_status);

  //license number
  const [licenseNumberState, updateLicenseNumberState] = useState(licenseNumber);

  // licence issued at
  const [licenseStateIssued, updateLicenseStateIssued] = useState(driver.license_state);

  // license date issued at
  const [licenseDateIssued, updateLicenseDateIssued] = useState(driver.license_issued_at);

  // req's sr-22
  const [reqSr22State, updateReqSr22State] = useState(driver.requires_sr22);

  //violations
  const [violationsState, updateViolationsState] = useState(violations);

  // mock data for inputs
  const licenseStatus = [
    {
      label: "Active",
      value: "Active",
      index: 1,
    },
    {
      label: "suspended",
      value: "suspended",
      index: 2,
    },
  ];

  const licenseState = [
    {
      label: "IL",
      value: "IL",
      index: 1,
    },
    {
      label: "MI",
      value: "MI",
      index: 2,
    },
  ];

  return (
    <Container>
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <Row>
          <Col>
            <h1>License Info</h1>
            <br />
            <strong>Is your license foreign or international?</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name=""
                id="inlineRadio1"
                value={true}
                checked={foreignLicenseState}
                onChange={(e) => {
                  return updateForeignLicenseState(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name=""
                id="inlineRadio2"
                value={false}
                checked={foreignLicenseState === false ? true : false}
                onChange={(e) => {
                  return updateForeignLicenseState(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                no
              </label>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>License status</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomSelect
              values={[{label:licenseStatusState, value:licenseStatusState}]}
              options={licenseStatus}
              onChange={(e) => {
                return updateLicenseStatusState(e[0].value);
              }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>License Number</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="A123-"
              value={licenseNumberState}
              onChange={(e) => {
                updateLicenseNumberState(e.target.value);
              }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>License state</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomSelect
              options={licenseState}
              onChange={(e) => {
                updateLicenseStateIssued(e[0].value);
              }}
              values={[{label:licenseStateIssued, value:licenseStateIssued}]}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>License Date issued</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="01/01/2021"
              onChange={(e) => {
                updateLicenseDateIssued(e.target.value);
              }}
            value={licenseDateIssued}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>Do you require SR-22</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="inlineRadioOptions"
                id="inlineRadioSr22"
                value={true}
                checked={reqSr22State}
                onChange={(e) => {
                  return updateReqSr22State(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadioSr22">
                yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value={false}
                checked={reqSr22State === false ? true : false }
                onChange={(e) => {
                  return updateReqSr22State(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                no
              </label>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>Any violations within the past 3 years?</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="inlineViolations"
                id="inlineViolations"
                value={true}
                checked={violationsState}
                onChange={(e) => {
                  return updateViolationsState(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineViolations">
                yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="inlineViolations"
                id="inlineViolations2"
                value={false}
                checked={violationsState === false ? true : false}
                onChange={(e) => {
                  return updateViolationsState(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="inlineViolations2">
                no
              </label>
            </div>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
};

export default withTranslation(["divers"])(LicenseInfo);
