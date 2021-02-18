import React from "react";
import { Row, Col, FormLabel, Form } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import { withTranslation } from "react-i18next";

const Discounts = ({ driver, updateParentState, t }) => {
  return (
    <FormContainer bootstrapProperties={{ sm: 12, md: 12, lg:6 }}>
      <h2>Discounts</h2>
      <FormLabel>Do any of these discounts apply? - Optional</FormLabel>
      <Row>
        <Col>
          <div className={"mb-3"}>
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
          </div>
          <div style={{ display: driver.defensive_driver ? "block" : "none" }}>
            <Form.Label>
              <small>Defensive Driving Course Completion Date</small>
            </Form.Label>
            <input
              className="custom-radio-container rounded mb-3"
              type="date"
              name={"date"}
              value={driver.defensive_driver_course_completed_at}
              onChange={(event) => {
                  updateParentState(event.target.value,
                  "defensive_driver_course_completed_at"
                );
              }}
            />
          </div>
        </Col>
      </Row>

      <small>Select all that apply.</small>
    </FormContainer>
  );
};

export default withTranslation(["drivers"])(Discounts);
