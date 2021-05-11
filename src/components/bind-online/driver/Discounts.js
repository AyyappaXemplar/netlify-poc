import React                  from "react";
import { withTranslation }    from "react-i18next";
import { Row, Col, FormLabel,
         Form }               from "react-bootstrap";

import FormContainer from "../../shared/FormContainer";
import Radio                     from "../../forms/Radio";
import { goodStudentAvailable }  from "../../forms/DriverForm";

import { getAge }                from '../../../services/driver-age'

function getGoodStudentDisabled(driver) {
  const age = getAge(driver.birthday)
  return goodStudentAvailable({ birthday: age, marital_status: driver.marital_status})
}

const Discounts = ({ driver, updateParentState, t }) => {
  const goodStudentDisabled = !getGoodStudentDisabled(driver)

  return (
    <FormContainer bootstrapProperties={{ lg:6 }}>
      <h2>Discounts</h2>
      <FormLabel>Do any of these discounts apply? - Optional</FormLabel>
      <Row>
        <Col>
          <div className={"mb-3"}>
            <Radio
              type='checkbox'
              label={t('discounts.good_student.label')}
              selected={driver.good_student}
              disabled={goodStudentDisabled}
              name="good_student"
              onChange={() => updateParentState(!driver.good_student, 'good_student')}
            />
            <Radio
              type='checkbox'
              label={t('discounts.defensive_driver.label')}
              selected={driver.defensive_driver}
              name="defensive_driver"
              onChange={() => updateParentState(!driver.defensive_driver, 'defensive_driver')}
            />
          </div>
          <div style={{ display: driver.defensive_driver ? "block" : "none" }}>
            <Form.Label>
              <small>Defensive Driving Course Completion Date</small>
            </Form.Label>
            <input
              className="custom-radio-container rounded mb-3"
              type="date"
              name="defensive_driver_course_completed_at"
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