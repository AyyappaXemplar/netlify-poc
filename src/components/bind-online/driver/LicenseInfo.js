import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import Radio from "../../forms/Radio";
import getDate, { getTimestamp } from "../../../services/timestamps";
import ViolationsForm from "./ViolationsForm";

const LicenseInfo = ({ driver, t, updateParentState, addViolation }) => {
  const [showViolationsForm, updateShowViolationsForm] = useState(
    !!driver.accident_violations.length
  );

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
            
          <div className="mb-3 d-flex flex-sm-row flex-column">
            { 
              t("hasForeignLicense").map((radio, index) => { 
                return <Radio 
                  key={index+1}
                  type={radio.type}
                  value={radio.value}
                  label={radio.label}
                  selected={driver.international_license === radio.value}
                  inline={true}
                  onChange={() => {
                    return updateParentState(radio.value, "international_license");
                  }}
                />
              })
            }
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
        <Row className={"mb-3 "}>
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

        <Row className={"mb-3 "}>
          <Col>
            <strong>License Date issued</strong>
          </Col>
        </Row>
        <Row className={"mb-3 "}>
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

        <Row className={"mb-3 "}>
          <Col>
            <Form.Label>Do you require an SR-22</Form.Label>

            <div className="mb-3 d-flex flex-sm-row flex-column">
              {t("reqSr22").map((item, index) => (
                <Radio
                  type={"radio"}
                  label={item.label}
                  value={item.value}
                  key={index}
                  selected={driver.requires_sr22 === item.value}
                  name="radio_sr22"
                  inline={true}
                  onChange={() => {
                    return updateParentState(item.value, "requires_sr22");
                  }}
                />
              ))}
            </div>
          </Col>
        </Row>

        <Row className={"mb-3 "}>
          <Col>
            <Form.Label>Any violations within the past 3 years?</Form.Label>

            <div className="mb-3 d-flex flex-sm-row flex-column">
              {t("violations").map((item, index) => (
                <Radio
                  type={"radio"}
                  label={item.label}
                  key={index}
                  selected={showViolationsForm === item.value}
                  name="radio_sr22"
                  inline={true}
                  onChange={() => {
                    updateShowViolationsForm(item.value);
                    return updateParentState(item.value, "has_violations");
                  }}
                />
              ))}
            </div>
          </Col>
        </Row>
        <Row className={"mb-3 "}>
          <ul>
            {driver.accident_violations.map((violation, index) => {return <li key={index+1}>{violation.date}{ " " }{violation.description}{ " " }{violation.type}</li>})}
          </ul>
        </Row>


        {showViolationsForm && (
          <ViolationsForm
            driver={driver}
            updateParentState={updateParentState}
            displayForm={true}
            addViolation={addViolation}
          />
        )}
      </FormContainer>
    </Container>
  );
};

export default withTranslation(["drivers"])(LicenseInfo);
