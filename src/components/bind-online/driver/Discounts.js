import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";

const Discounts = () => {
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
            <div className="mb-3 flex-column">
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                label={"Good driver discount"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                label={"Good student discount"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                label={"Completed a defensive driver course"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
            </div>
          </Col>
              </Row>
              Select all that apply.
      </FormContainer>
    </Container>
  );
};

export default Discounts;
