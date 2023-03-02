import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import InputMask from "react-input-mask";

import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import ViolationsForm from "./ViolationsForm";
import ViolationsCard from "./ViolationsCard";
import statesData from "../../../data/US-state-options";
import { displayLinuxDate } from "../../../services/driver-age";

const LicenseInfo = ({
  driver,
  t,
  updateParentState,
  updateForeignLicense,
  addViolation,
  deleteViolation,

}) => {
  const licenseIssuedAtEntered = localStorage.getItem(
    `${driver.id}-enteredLicenseIssuedAt`
  );
  const [licenseIssuedAt, setlicenseIssuedAt] = useState(
    licenseIssuedAtEntered ? displayLinuxDate(driver.license_issued_at) : ""
  );
  const sr22FilingDateEntered = localStorage.getItem(
    `${driver.id}-enteredSr22FilingDate`
  );
  const [sr22FilingDate, setSr22FilingDate] = useState(
    sr22FilingDateEntered ? displayLinuxDate(driver.sr22_filing_date) : ""
  );
  const [showViolationsForm, updateShowViolationsForm] = useState(
    !!driver.accident_violations?.length
  );

  const licenseStatus = [
    {
      label: t("bindOnline.licenseInfo.licenseStatus.Active"),
      value: "active",
      index: 1,
    },
    {
      label: t("bindOnline.licenseInfo.licenseStatus.Suspended"),
      value: "suspended",
      index: 2,
    },
    {
      label: t("bindOnline.licenseInfo.licenseStatus.Permit"),
      value: "permit",
      index: 3,
    },
    {
      label: t("bindOnline.licenseInfo.licenseStatus.Foreign"),
      value: "foreign",
      index: 4,
    },
    {
      label: t("bindOnline.licenseInfo.licenseStatus.Expired"),
      value: "expired",
      index: 5,
    },
    {
      label: t("bindOnline.licenseInfo.licenseStatus.notLicensed"),
      value: "not_licensed",
      index: 6,
    },
  ];

  const licenseStateOptions = [
    ...statesData,
    {
      label: t("bindOnline.licenseInfo.licenseStateOptions.intrnl"),
      value: "IT",
      index: 4,
    },
    {
      label: t("bindOnline.licenseInfo.licenseStateOptions.excld"),
      value: "EX",
      index: 5,
    },
  ];

  const sr22StateOptions = {
    IL: [
      { value: "IL", label: "IL" },
      { value: "IN", label: "IN" },
    ],
    IN: [
      { value: "IL", label: "IL" },
      { value: "IN", label: "IN" },
    ],
    MI: [{ label: "MI", value: "MI" }],
    KS: [{ value: "KS", label: "KS" }],
    MO: [
      { value: "IL", label: "IL" },
      { value: "IN", label: "IN" },
      { value: "IA", label: "IA" },
      { value: "MO", label: "MO" },
      { value: "TX", label: "TX" },
      { value: "WI", label: "WI" },
      { value: "MO", label: "MO" },
    ],
    WI: [{ value: "WI", label: "WI" }],
  };

  function findLicenseStatusValues() {
    if (!driver?.license_status) {
      return [];
    } else {
      const licenseStatusOpt = licenseStatus.find(
        (option) => option.value === driver.license_status
      );
      return [licenseStatusOpt];
    }
  }

  function findLicenseStateValues() {
    if (!driver?.license_state) {
      return [];
    } else {
      const option = licenseStateOptions.find(
        (option) => option.value === driver.address.state
      );
      return [option];
    }
  }

  function findSr22State() {
    const options = sr22StateOptions[driver.license_state];
    if (!driver?.requires_sr22 || !driver?.license_state || !options) {
      return [];
    } else {
      const option = options.find(
        (option) => option.value === driver.sr22_state
      );
      return option ? [option] : [];
    }
  }

  function customSelectUpdate(values, prop) {
    if (values[0]) {
      updateParentState(values[0].value, prop);
    }
  }
  function checkMaxLenght(){
    if (driver?.license_state ==="IL") {
      return 12
    } else if(driver?.license_state ==="IN") {
      return 10
    } 
  }

  return (
    <FormContainer bootstrapProperties={{ lg: 6 }}>
      <Row className={"mb-4"}>
        <Col>
          <h2>{t("bindOnline.licenseInfo.headers.title")}</h2>
        </Col>
      </Row>

      <Form.Label>
        {t("bindOnline.licenseInfo.headers.isForeignLicense")}
      </Form.Label>
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
              onChange={() => updateForeignLicense(radio.value)}
            />
          );
        })}
      </div>

      <Form.Label>
        {t("bindOnline.licenseInfo.headers.licenseStatus")}
      </Form.Label>
      <CustomSelect
        disabled={driver.international_license}
        wrapperClassNames="mb-3"
        values={findLicenseStatusValues()}
        options={licenseStatus}
        onChange={(val) => customSelectUpdate(val, "license_status")}
      />
      {driver.license_status !== "not_licensed" && (
        <div>
          <Form.Label>
            {t("bindOnline.licenseInfo.headers.licenseState")}
          </Form.Label>
          <CustomSelect
            disabled={driver.international_license}
            wrapperClassNames="mb-3"
            options={licenseStateOptions}
            selected={driver?.address?.state}
            onChange={(val) => customSelectUpdate(val, "license_state")}
            values={findLicenseStateValues()}
          />
          <Form.Label>
            {t("bindOnline.licenseInfo.headers.licenseNumber")}
          </Form.Label>
          <Form.Control
            disabled={driver.international_license}
            placeholder="A1234567890"
            maxLength={checkMaxLenght()}
            value={driver.license_number}
            onChange={(e) => {
              const checkVal = /^$|^[a-z0-9_\s]+$/i.test(e.target.value)
              const checkIN  = /^[0-9]*$/i.test(e.target.value);
              const isIL = driver?.license_state === "IL";
              const isIN = driver?.license_state === "IN";

              if (isIL) {
                if(checkVal) {
                  updateParentState(
                    e.target.value.toLocaleUpperCase(),
                    "license_number"
                  );  
                }
              } else if(isIN) {
                if (checkIN) {
                  updateParentState(
                    e.target.value.toLocaleUpperCase(),
                    "license_number"
                  );  
                }
              } else {
                if (checkVal){
                  updateParentState(
                    e.target.value.toLocaleUpperCase(),
                    "license_number"
                  );  
                }
              }
            }}
          />
          <p className="p-0 mb-3">
            <small>{t("bindOnline.licenseInfo.headers.subtext")}</small>
          </p>
          <Form.Label>
            {t("bindOnline.licenseInfo.headers.licenseIssued")}
          </Form.Label>
          <InputMask
            className="rounded custom-radio-container font-weight-light mb-4"
            disabled={driver.international_license}
            mask="99/99/9999"
            maskChar="-"
            placeholder="mm/dd/yyyy"
            type="input"
            value={licenseIssuedAt}
            onChange={(event) => {
              setlicenseIssuedAt(event.target.value);
              return updateParentState(event.target.value, "license_issued_at");
            }}
          />

          <Form.Label>{t("bindOnline.licenseInfo.reqSr22")}</Form.Label>
          <div className="mb-3 d-flex flex-sm-row flex-column">
            {t("reqSr22").map((item, index) => (
              <Radio
                type="radio"
                label={t(item.label.toLowerCase())}
                value={item.value}
                key={index}
                selected={driver.requires_sr22 === item.value}
                name="radio_sr22"
                inline={true}
                onChange={() => updateParentState(item.value, "requires_sr22")}
              />
            ))}
          </div>

          {driver.requires_sr22 && driver.license_state && (
            <div>
              <Form.Label>{t("bindOnline.licenseInfo.sr22State")}</Form.Label>
              <CustomSelect
                searchable={false}
                wrapperClassNames="mb-3"
                values={findSr22State()}
                options={sr22StateOptions[driver.license_state]}
                placeholder="SR-22 State"
                onChange={(val) => customSelectUpdate(val, "sr22_state")}
              />

              <Form.Label>
                {t("bindOnline.licenseInfo.sr22CaseNumber")}
              </Form.Label>
              <Form.Control
                className="mb-3"
                type="input"
                value={driver.sr22_case_number ? driver.sr22_case_number : ""}
                onChange={(e) => {
                  updateParentState(e.target.value, "sr22_case_number");
                }}
              />

              <Form.Label>
                {t("bindOnline.licenseInfo.sr22WhenFiles")}
              </Form.Label>
              <InputMask
                className="rounded custom-radio-container font-weight-light mb-2"
                mask="99/99/9999"
                maskChar="-"
                placeholder="mm/dd/yyyy"
                type="input"
                value={sr22FilingDate}
                onChange={(event) => {
                  setSr22FilingDate(event.target.value);
                  updateParentState(event.target.value, "sr22_filing_date");
                }}
              />
            </div>
          )}
          <Form.Label>{t("bindOnline.licenseInfo.anyViolations")}</Form.Label>
          <div className="mb-3 d-flex flex-sm-row flex-column">
            {t("violations").map((item, index) => (
              <Radio
                type={"radio"}
                label={t(item.label.toLowerCase())}
                key={index}
                selected={
                  (!!driver.accident_violations?.length ||
                    showViolationsForm) === item.value
                }
                name={`violations-${item.label}`}
                inline={true}
                onChange={() => updateShowViolationsForm(item.value)}
              />
            ))}
          </div>

          {driver.accident_violations.map((violation, index) => {
            return (
              <ViolationsCard
                key={index + 1}
                violation={violation}
                deleteViolation={deleteViolation}
                updateShowViolationsForm={updateShowViolationsForm}
                index={index}
              />
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

          {!showViolationsForm && driver.accident_violations.length > 0 && (
            <Row>
              <Col>
                {/* <img src="" alt="add incident"/> */}
                <button
                  type="button"
                  className="btn btn-link text-info"
                  onClick={() => {
                    updateShowViolationsForm(true);
                  }}
                >
                  Add Another Incident
                </button>
              </Col>
            </Row>
          )}
        </div>
      )}
    </FormContainer>
  );
};

export default withTranslation(["drivers"])(LicenseInfo);
