import React from "react";
import { Row, Col, FormLabel } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import { withTranslation } from "react-i18next";

const Discounts = ({ driver, updateParentState, t }) => {

  return (
    <FormContainer bootstrapProperties={{ md: 6 }}>
      <h2>Discounts</h2>
      <FormLabel>Do any of these discounts apply? - Optional</FormLabel>
      <Row>
        <Col>
          {t("discounts").map((item, index) => {
            return (
              <Radio
                type={item.type}
                label={item.label}
                value={item.value}
                key={index}
                selected={driver[item.key] !== item.value}
                name="radio_sr22"
                onChange={() => {
                  return updateParentState(!driver[item.key], item.key);
                }}
              />
            );
          })}
        </Col>
      </Row>
      Select all that apply.
    </FormContainer>
  );
};

export default withTranslation(["drivers"])(Discounts);
