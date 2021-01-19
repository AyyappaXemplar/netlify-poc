import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";

const Discounts = ({ driver }) => {
  
  const [goodDriverState, updateGoodDriverState] = useState(driver.good_driver);

  const [goodStudentState, updateGoodStudentState] = useState(driver.good_student);

  const [defensiveDriveState, updateDefensiveDriverState] = useState(driver.defensive_driver);


  return (
    <Container>
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <Row>
          <Col>
            <h1>Discounts</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>Do any of these discounts apply (optional)?</strong>
            <div className="flex-column">
              <label htmlFor="goodDiscount">Good Driver Discount</label>&nbsp;
              <input
                type={"checkbox"}
                id="goodDiscount"
                label={"Good driver discount"}
                value={true}
                onChange={(e) => {
                  e.persist();
                  updateGoodDriverState(true);
                  console.log(this)
                }}
                checked={goodDriverState}
              />
              &nbsp;
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Good Student Discount</label>&nbsp;
            <input
              type={"checkbox"}
              label={"Good student discount"}
              value={true}
              onChange={(e) => {
                e.persist();
                updateGoodStudentState(true);
              }}
              checked={goodStudentState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <label>Completed a defensive driver course</label>&nbsp;
            <input
              type={"checkbox"}
              label={"Completed a defensive driver course"}
                value={true}
                onChange={(e) => { 
                e.persist();
                updateDefensiveDriverState(true)
              }}
              checked={defensiveDriveState}
            />
          </Col>
        </Row>
        Select all that apply.
      </FormContainer>
    </Container>
  );
};

export default Discounts;
