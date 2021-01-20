import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";

const Discounts = ({ driver, updateParentState }) => {
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
                  return updateParentState(true, "good_driver");
                }}
                checked={driver.good_driver}
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
                return updateParentState(true, "good_student");
              }}
              checked={driver.good_student}
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
                return updateParentState(true, "defensive_driver");
              }}
              checked={driver.defensive_driver}
            />
          </Col>
        </Row>
        Select all that apply.
      </FormContainer>
    </Container>
  );
};

export default Discounts;
