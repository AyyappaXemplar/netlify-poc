import React, { useState } from "react";
import { Row, Col, Form }  from "react-bootstrap";
import { withTranslation } from "react-i18next";

import CustomSelect  from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import Radio         from "../../forms/Radio";
import ViolationsForm from "./ViolationsForm";
import ViolationsCard from "./ViolationsCard";

import statesData     from "../../../data/US-state-options"

const LicenseInfo = ({ driver, t, updateParentState, addViolation, deleteViolation,
                       updateForeignLicense }) => {
  const [showViolationsForm, updateShowViolationsForm] = useState(!!driver.accident_violations?.length);

  const licenseStatus = [
    {label: 'Active',    value: 'active',    index: 1},
    {label: 'Suspended', value: 'suspended', index: 2},
    {label: 'Permit',    value: 'permit',    index: 3},
    {label: 'Foreign',   value: 'foreign',   index: 4},
    {label: 'Expired',   value: 'expired',   index: 5},
  ];

  const licenseStateOptions = [...statesData,
    {label: "International", value: "IT", index: 4},
    {label: "Excluded", value: "EX", index: 5}
  ];

  const sr22StateOptions = {
    IL: [{ value: 'IL', label: 'IL' }, { value: 'IN', label: 'IN' }],
    IN: [{ value: 'IL', label: 'IL' }, { value: 'IN', label: 'IN' }],
    MI: [{label: "MI", value: "MI"}],
    KS: [{ value: 'KS', label: 'KS' }],
    MO: [{ value: 'IL', label: 'IL' }, { value: 'IN', label: 'IN' },
         { value: 'IA', label: 'IA' }, { value: 'MO', label: 'MO' },
         { value: 'TX', label: 'TX' }, { value: 'WI', label: 'WI' },
         { value: 'MO', label: 'MO' }],
    WI: [{ value: 'WI', label: 'WI' }]
  }

  function findLicenseStatusValues() {
    if (!driver?.license_status) {
      return []
    } else {
      const licenseStatusOpt = licenseStatus.find(option => option.value === driver.license_status)
      return [licenseStatusOpt]
    }
  }

  function findLicenseStateValues() {
    if (!driver?.license_state) {
      return []
    } else {
      const option = licenseStateOptions.find(option => option.value === driver.license_state)
      return [option]
    }
  }

  function findSr22State() {
    const options = sr22StateOptions[driver.license_state]
    if (!driver?.requires_sr22 || !driver?.license_state || !options) {
      return []
    } else {
      const option = options.find(option => option.value === driver.sr22_state)
      return option ? [option] : []
    }
  }

  function customSelectUpdate(values, prop) {
    if (values[0]) {
      updateParentState(values[0].value, prop)
    }
  }

  return (
    <FormContainer bootstrapProperties={{ lg:6 }}>
      <Row className={"mb-4"}>
        <Col>
          <h2>License Info</h2>
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
              onChange={() => updateForeignLicense(radio.value) }
            />
          );
        })}
      </div>

      <Form.Label>What is your license status?</Form.Label>
      <CustomSelect
        disabled={driver.international_license}
        wrapperClassNames={"mb-3"}
        values={findLicenseStatusValues()}
        options={licenseStatus}
        onChange={val => customSelectUpdate(val, "license_status")}
      />
      <Form.Label>What is your license state?</Form.Label>
      <CustomSelect
        disabled={driver.international_license}
        wrapperClassNames={"mb-3"}
        options={licenseStateOptions}
        onChange={val => customSelectUpdate(val, 'license_state')}
        values={findLicenseStateValues()}
      />
      <Form.Label>What is your license number?</Form.Label>
      <Form.Control
        disabled={driver.international_license}
        placeholder="A1234567890"
        className={"mb-3"}
        value={driver.license_number}
        onChange={(e) => updateParentState(e.target.value, "license_number")}
      />

      <Form.Label>When was your license issued?</Form.Label>
      <input
        disabled={driver.international_license}
        className={"mb-3 custom-radio-container rounded"}
        type="date"
        value={driver.license_issued_at}
        onChange={(event) => updateParentState(event.target.value, "license_issued_at")}
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

      { driver.requires_sr22 && driver.license_state &&

        <CustomSelect
          searchable={false}
          wrapperClassNames="mb-3"
          values={findSr22State()}
          options={sr22StateOptions[driver.license_state]}
          placeholder="SR-22 State"
          onChange={val => customSelectUpdate(val, 'sr22_state')}
        />

      }

      <Form.Label>Any violations within the past 3 years?</Form.Label>
      <div className="mb-3 d-flex flex-sm-row flex-column">
        {t("violations").map((item, index) => (
          <Radio
            type={"radio"}
            label={item.label}
            key={index}
            selected={(!!driver.accident_violations?.length || showViolationsForm) === item.value}
            name={`violations-${item.label}`}
            inline={true}
            onChange={() => updateShowViolationsForm(item.value) }
          />
        ))}
      </div>

      {driver.accident_violations.map((violation, index) => {
        return (
          <ViolationsCard key={index + 1} violation={violation} deleteViolation={deleteViolation}
            updateShowViolationsForm={updateShowViolationsForm} index={index}/>
        );
      })}

      {showViolationsForm && (
        <ViolationsForm
          driver={driver}
          updateParentState={updateParentState}
          displayForm={true}
          addViolation={addViolation}
          updateShowViolationsForm={updateShowViolationsForm}
          showViolationsForm={showViolationsForm}
        />
      )}

      {(!showViolationsForm && driver.accident_violations.length > 0) && (
        <Row>
          <Col>
            {/* <img src="" alt="add incident"/> */}
            <button type="button" className="btn btn-link text-info" onClick={() => { updateShowViolationsForm(true) }}>Add Another Incident</button>
          </Col>
        </Row>
      )}

    </FormContainer>
  );
};

export default withTranslation(["drivers"])(LicenseInfo);
