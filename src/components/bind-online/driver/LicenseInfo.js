import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";

import getDate, { getTimestamp } from "../../../services/timestamps";

const LicenseInfo = ({ driver, t, updateParentState }) => {
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
                value={1}
                checked={driver.international_license === false ? false : true}
                onChange={(e) => {
                  return updateParentState(true, "international_license");
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
                value={0}
                checked={driver.international_license === false ? true : false}
                onChange={(e) => {
                  return updateParentState(false, "international_license");
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
              values={[
                { label: driver.license_status, value: driver.license_status },
              ]}
              options={licenseStatus}
              onChange={(e) => {
                return updateParentState(e[0].value, "license_status");
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
              value={driver.license_number}
              onChange={(e) => {
                return updateParentState(e.target.value, "license_number");
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
                return updateParentState(e[0].value, "license_state");
              }}
              values={[
                { label: driver.license_state, value: driver.license_state },
              ]}
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
            <input
              type="date"
              value={getDate(driver.license_issued_at)}
              onChange={(event) => {
                let timestamp = getTimestamp(event.target.value);
                return updateParentState(timestamp, "license_issued_at");
              }}
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
                checked={driver.requires_sr22}
                onChange={(e) => {
                  return updateParentState(true, "requires_sr22");
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
                checked={driver.requires_sr22 === false ? true : false}
                onChange={(e) => {
                  return updateParentState(false, "requires_sr22");
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
                checked={driver.has_violations}
                onChange={(e) => {
                  return updateParentState(true, "has_violations");
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
                checked={driver.has_violations === false ? true : false}
                onChange={(e) => {
                  return updateParentState(false, "has_violations");
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
