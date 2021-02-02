import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import Radio from "../../forms/Radio";
import getDate, { getTimestamp } from "../../../services/timestamps";
import ViolationsForm from "./ViolationsForm";
import ViolationsCard from "./ViolationsCard";

const LicenseInfo = ({ driver, t, updateParentState, addViolation }) => {
  const [showViolationsForm, updateShowViolationsForm] = useState(
    !!driver.violations.length
  );

  const licenseStatus = [
    {label: "Active",    value: "active",    index: 1},
    {label: "Suspended", value: "suspended", index: 2},
    {label: 'Permit',    value: 'permit',    index: 3},
    {label: 'Foreign',   value: 'foreign',   index: 4},
    {label: 'Expired',   value: 'expired',   index: 5},
  ];

  const licenseState = [
    {label: "IL", value: "IL", index: 1},
    {label: "MI", value: "MI", index: 2},
    {label: "IN", value: "IN", index: 2}
  ];


  function findLicenseStatusValues() {
    if (!driver?.license_status) {
      return []
    } else {
      const licenseStatusOpt = licenseStatus.find(option => option.value === driver.license_status)
      return [licenseStatusOpt]
    }
  }

  function changeLicenseState(event) {
    if (event[0]) {
      updateParentState(event[0].value, "license_state")
    }
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <Row className={"mb-4"}>
          <Col>
            <h1>License Info</h1>

          </Col>
        </Row>

        <Form.Label>Is your license foreign or international?</Form.Label>
        <div className="mb-3 d-flex flex-sm-row flex-column">
          {t("hasForeignLicense").map((radio, index) => {
            return (
              <Radio
                key={index + 1}
                type={radio.type}
                value={radio.value}
                label={radio.label}
                selected={driver.international_license === radio.value}
                inline={true}
                onChange={() => {
                  return updateParentState(
                    radio.value,
                    "international_license"
                  );
                }}
              />
            );
          })}
        </div>

        <Form.Label>What is your license status?</Form.Label>
        <CustomSelect
          wrapperClassNames={"mb-3"}
          values={[licenseStatus.find(option => option.value === driver.license_status)]}
          options={licenseStatus}
          onChange={(e) => updateParentState(e[0].value, "license_status")}
        />
        <Form.Label>What is your license state?</Form.Label>
        <CustomSelect
          wrapperClassNames={"mb-3"}
          options={licenseState}
          onChange={(e) => changeLicenseState(e)}
          values={findLicenseStatusValues()}
        />
        <Form.Label>What is your license number?</Form.Label>
        <Form.Control
          placeholder="A123-"
          className={"mb-3"}
          value={driver.license_number}
          onChange={(e) => updateParentState(e.target.value, "license_number")}
        />

        <Form.Label>When was your license issued?</Form.Label>
        <input
          className={"mb-3 custom-radio-container rounded"}
          type="date"
          value={getDate(driver.license_issued_at)}
          onChange={(event) => {
            let timestamp = getTimestamp(event.target.value);
            return updateParentState(timestamp, "license_issued_at");
          }}
        />

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
              onChange={() => updateParentState(item.value, "requires_sr22")}
            />
          ))}
        </div>

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
              onChange={() => updateShowViolationsForm(item.value) }
            />
          ))}
        </div>

          {driver.violations.map((violation, index) => {
            return (
              <ViolationsCard key={index + 1} violation={violation} />
            );
          })}

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
