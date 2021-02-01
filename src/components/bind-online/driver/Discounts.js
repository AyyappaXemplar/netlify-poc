import React, { useState } from "react";
import { Container, Row, Col, FormLabel } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import { withTranslation } from "react-i18next";

const Discounts = ({ driver, updateParentState, t }) => {

  const [discountsState, updateDiscountState] = useState({
    defensive_driver: driver.defensive_driver,
    good_driver: driver.good_driver,
    good_student: driver.good_student,
  });

  const toggleValue = (value) => { 
    if (value === true) {
      return false
    }
    else { 
      return true
    }
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <h1>Discounts</h1>
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
                  selected={discountsState[item.key]}
                  name="radio_sr22"
                  onChange={() => {
       
                    updateDiscountState((prevState) => { 
                      const newDiscountState = { ...prevState }
                      newDiscountState[item.key] = toggleValue(prevState[item.key])
                      return newDiscountState
                    })
                    return updateParentState(!discountsState[item.key], item.key);
                  }}
                />
              );
            })}
          </Col>
        </Row>
        Select all that apply.
      </FormContainer>
    </Container>
  );
};

export default withTranslation(["drivers"])(Discounts);
