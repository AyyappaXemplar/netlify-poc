import React, { useState } from "react";
import { Row, Col, Form }  from "react-bootstrap";
import { withTranslation } from "react-i18next";
import InputMask from "react-input-mask"

import CustomSelect  from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import Radio         from "../../forms/Radio";
import statesData    from "../../../data/US-state-options"
import { displayLinuxDate }    from '../../../services/driver-age'


const LicenseInfo = ({ driver, t, updateParentState, updateForeignLicense }) => {
  const licenseIssuedAtEntered = localStorage.getItem(`${driver.id}-enteredLicenseIssuedAt`)
  const [licenseIssuedAt, setlicenseIssuedAt] = useState(licenseIssuedAtEntered ? displayLinuxDate(driver.license_issued_at) : "")
  const sr22FilingDateEntered = localStorage.getItem(`${driver.id}-enteredSr22FilingDate`)
  const [sr22FilingDate, setSr22FilingDate] = useState(sr22FilingDateEntered ? displayLinuxDate(driver.sr22_filing_date) : "")

  const licenseStatus = [
    {label: 'Active',    value: 'active',    index: 1},
    {label: 'Suspended', value: 'suspended', index: 2},
    {label: 'Permit',    value: 'permit',    index: 3},
    {label: 'Foreign',   value: 'foreign',   index: 4},
    {label: 'Expired',   value: 'expired',   index: 5},
    {label: 'Not Licensed',   value: 'not_licensed',   index: 6},
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
        wrapperClassNames="mb-3"
        values={findLicenseStatusValues()}
        options={licenseStatus}
        onChange={val => customSelectUpdate(val, "license_status")}
      />
      { driver.licenseStatus &&
      <div>
        <Form.Label>What is your license state?</Form.Label>
        <CustomSelect
          disabled={driver.international_license}
          wrapperClassNames="mb-3"
          options={licenseStateOptions}
          onChange={val => customSelectUpdate(val, 'license_state')}
          values={findLicenseStateValues()}
        />
        <Form.Label>What is your license number?</Form.Label>
        <Form.Control
          disabled={driver.international_license}
          placeholder="A1234567890"
          value={driver.license_number}
          onChange={(e) => {
            const checkVal = /^$|^[a-z0-9_\s]+$/i.test(e.target.value);  
            if (checkVal) { updateParentState(e.target.value.toLocaleUpperCase(), "license_number") }
          }}
        />
        <p className="p-0 mb-3"><small>Add your drivers license number without the dashes or space</small></p>
        <Form.Label>When was your license issued?</Form.Label>
        <InputMask
          className="rounded custom-radio-container font-weight-light mb-4"
          disabled={driver.international_license}
          mask="99/99/9999"
          maskChar="-"
          placeholder="mm/dd/yyyy"
          type="input"
          value={licenseIssuedAt}
          onChange={(event) => {
            setlicenseIssuedAt(event.target.value)
            return updateParentState(event.target.value, "license_issued_at")
          }}
        />

        <Form.Label>Do you require an SR-22?</Form.Label>
        <div className="mb-3 d-flex flex-sm-row flex-column">
          {t("reqSr22").map((item, index) => (
            <Radio
              type="radio"
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
          <div>
            <Form.Label>What is your SR-22 state?</Form.Label>
            <CustomSelect
              searchable={false}
              wrapperClassNames="mb-3"
              values={findSr22State()}
              options={sr22StateOptions[driver.license_state]}
              placeholder="SR-22 State"
              onChange={val => customSelectUpdate(val, 'sr22_state')}
            />


            <Form.Label>What is your SR-22 case number? (optional)</Form.Label>
            <Form.Control
              className="mb-3"
              type="input"
              value={driver.sr22_case_number ? driver.sr22_case_number : ""}
              onChange={(e) => {
                updateParentState(e.target.value, "sr22_case_number");
              }}
            />

            <Form.Label>When was your SR-22 filed? (optional)</Form.Label>
            <InputMask
              className="rounded custom-radio-container font-weight-light mb-2"
              mask="99/99/9999"
              maskChar="-"
              placeholder="mm/dd/yyyy"
              type="input"
              value={sr22FilingDate}
              onChange={(event) => {
                setSr22FilingDate(event.target.value)
                updateParentState(event.target.value, "sr22_filing_date")
              }}
            />
          </div>
         }
      </div>
      }
    </FormContainer>
  );
};

export default withTranslation(["drivers"])(LicenseInfo);
