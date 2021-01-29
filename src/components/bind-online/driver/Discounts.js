import React, { useState } from "react";
import { Container, Row, Col, FormLabel } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import { withTranslation } from "react-i18next";


const Discounts = ({ driver, updateParentState, t }) => {

  // const [discountState, updateDiscountsState] = useState({

  //   good_driver: driver.good_driver,
  //   good_student: driver.good_student,
  //   defensive_driver: driver.defensive_driver

  // });

  return (
    <Container>
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <h1>Discounts</h1>
        <FormLabel>Do any of these discounts apply? - Optional</FormLabel>
        <Row>
          <Col>
            {t("discounts").map((item, index) => {

              return <Radio
                type={item.type}
                label={item.label}
                value={item.value}
                key={index}
                selected={driver[item.label] === item.value}
                name="radio_sr22"
                onChange={() => {
                  return updateParentState(true, item.label);
                }}
              />
            })}
          </Col>
        </Row>
        Select all that apply.
      </FormContainer>
    </Container>
  );
};

export default withTranslation(["drivers"])(Discounts);
