import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import updateState from "../../../utilities/updateState";

const Discounts = () => {
  const [goodDriverState, updateGoodDriverState] = useState({
    good_driver: "",
  });

  const [goodStudentState, updateGoodStudentState] = useState({
    good_student: "",
  });

  const [defensiveDriveState, updateDefensiveDriverState] = useState({
    defensive_driver: "",
  });

  // handlers / wrappers for updating state vars

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
                type={"radio"}
                id="goodDiscount"
                label={"Good driver discount"}
                value={true}
                //   key={index}
                //   selected={homeowner === item.value}
                onChange={(e) => {
                  e.persist();
                  updateGoodDriverState((prevState) => {
                    updateState(prevState, e, "good_driver");
                  });
                }}
              />
              &nbsp;
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Good Student Discount</label>&nbsp;
            <input
              type={"radio"}
              //   id={`info-home-${item.value}`}
              label={"Good student discount"}
              value={true}
              //   key={index}
              //   selected={homeowner === item.value}
              onChange={(e) => {
                e.persist();
                updateGoodStudentState((prevState) => {
                  updateState(prevState, e, "good_student");
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <label>Completed a defensive driver course</label>&nbsp;
            <input
              type={"radio"}
              //   id={`info-home-${item.value}`}
              label={"Completed a defensive driver course"}
                value={true}
              //   key={index}
              //   selected={homeowner === item.value}
              onChange={(e) => { 
                e.persist();
                updateDefensiveDriverState((prevState) => {
                  updateState(prevState, e, "defensive_driver")
                 })
              }}
            />
          </Col>
        </Row>
        Select all that apply.
      </FormContainer>
    </Container>
  );
};

export default Discounts;
