import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import { withTranslation } from "react-i18next";
import updateState from "../../../utilities/updateState"

const LicenseInfo = ({ t }) => {
  /* state const's */

  // is foreign license
  const [foreignLicenseState, updateForeignLicenseState] = useState({
    international_license: false,
  });

  // license status
  const [licenseStatusState, updateLicenseStatusState] = useState({
    license_status: "",
  });

  //license number
  const [licenseNumberState, updateLicenseNumberState] = useState({
    license_number: "",
  });

  // licence issued at
  const [licenseStateIssued, updateLicenseStateIssued] = useState({
    license_state: "",
  });

  // license date issued at
  const [licenseDateIssued, updateLicenseDateIssued] = useState({
    license_issued_at: "",
  });

  // req's sr-22
  const [reqSr22State, updateReqSr22State] = useState({
    requires_sr22: "",
  });

  //violations
  const [violationsState, updateViolationsState] = useState({
    any_violations: "",
  });

  /* handlers */

  const updateViolationsObj = (event) => {
    event.persist();
    updateViolationsState((prevState) => {
      updateState(prevState, event, "any_violations");
    });
  };

  const updateLicenseDateObj = (event) => {
    event.persist();
    updateLicenseDateIssued((prevState) => {
      updateState(prevState, event, "license_issued_at");
    });
  };

  const updateSr22Obj = (event) => {
    event.persist();
    updateReqSr22State((prevState) => {
      updateState(prevState, event, "requires_sr22");
    });
  };

  const updateForeignLicenseObj = (event) => {
    event.persist();
    updateForeignLicenseState((prevState) => {
      updateState(prevState, event, "international_license");
    });
  };

  const updateLicenseStatusObj = (event) => {
    updateLicenseStatusState((prevState) => {
      const status = { ...prevState };
      status["license_status"] = event[0].value;
      console.log("license status", status);
      return status;
    });
  };

  const updateLicenseNumberObj = (event) => {
    event.persist();
    updateLicenseNumberState((prevState) => {
      updateState(prevState, event, "license_number");
    });
  };

  const updateLicenseStateObj = (event) => {
    updateLicenseStateIssued((prevState) => {
      const statePicked = { ...prevState };
      statePicked["license_state"] = event[0].value;
      console.log(statePicked);
      return statePicked;
    });
  };

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
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value={true}
                onChange={(e) => {
                  return updateForeignLicenseObj(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value={false}
                onChange={(e) => {
                  return updateForeignLicenseObj(e);
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
              options={licenseStatus}
              onChange={(e) => {
                return updateLicenseStatusObj(e);
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
              value={licenseNumberState.license_number}
              onChange={(e) => {
                updateLicenseNumberObj(e);
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
                updateLicenseStateObj(e);
              }}
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
                updateLicenseDateObj(e);
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
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadioSr22"
                value={true}
                onChange={(e) => {
                  return updateSr22Obj(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadioSr22">
                yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value={false}
                onChange={(e) => {
                  return updateSr22Obj(e);
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
                type="radio"
                name="inlineViolations"
                id="inlineViolations"
                value={true}
                onChange={(e) => {
                  return updateViolationsObj(e);
                }}
              />
              <label className="form-check-label" htmlFor="inlineViolations">
                yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineViolations"
                id="inlineViolations2"
                value={false}
                onChange={(e) => {
                  return updateViolationsObj(e);
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
