import React from "react";
import { withTranslation } from "react-i18next";
import { Form } from "react-bootstrap";

import CustomSelect from "../forms/CustomSelect";

function AddressOptions({ t, addressOptions, onChange, isMobile }) {
  const dropdownAddressOptions = () => {
    return addressOptions.map((option, index) => {
      return {
        label: `${option.city} (${option.county})`,
        value: option,
        index,
      };
    });
  };

  return (
    <div className={isMobile ? "block" : ""}>
      <Form.Label>{t("new.form.city.label")}</Form.Label>
      <CustomSelect
        valueField={"index"}
        placeholder={"Select your city"}
        options={dropdownAddressOptions()}
        onChange={onChange}
      />
    </div>
  );
}
export default withTranslation(["quotes"])(AddressOptions);
