import React                  from "react";
import { useSelector }          from "react-redux";
import { withTranslation }    from "react-i18next";
import { Row, Col, FormLabel,
         Form }               from "react-bootstrap";

import FormContainer from "../../shared/FormContainer";
import Radio                     from "../../forms/Radio";
import { goodStudentAvailable }  from "../../forms/DriverForm";

import { dateToAge }                from '../../../services/driver-age'

function getGoodStudentDisabled(driver) {
  const age = dateToAge(driver.birthday)
  return goodStudentAvailable({ birthday: age, marital_status: driver.marital_status})
}

const Discounts = ({ driver, updateParentState, t }) => {
  const goodStudentDisabled = !getGoodStudentDisabled(driver)
  const driverState = useSelector((state) => state.data.quote.address.state);

  return (
    <FormContainer bootstrapProperties={{ lg:6 }}>
      <h2>{t("bolDiscounts.title")}</h2> 
      <FormLabel>{t("bolDiscounts.formLabel")}</FormLabel>
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
            { driverState !== 'IN' ?
              <Radio
                type='checkbox'
                label={t('discounts.defensive_driver.label')}
                selected={driver.defensive_driver}
                name="defensive_driver"
                onChange={() => updateParentState(!driver.defensive_driver, 'defensive_driver')}
              />
            : 
            null
            }
          </div>
          <div style={{ display: driver.defensive_driver ? "block" : "none" }}>
            <Form.Label>
              <small>{t("bolDiscounts.defensiveDrivingCourseCompletionDate")}</small>
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

      <small>{t("bolDiscounts.selectAllThatApply")}</small>
    </FormContainer>
  );
};

export default withTranslation(["drivers"])(Discounts);
