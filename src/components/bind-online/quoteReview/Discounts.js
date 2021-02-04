import React from "react";
import CustomCard from "../../shared/CustomCard";
import { Row, Col, Container } from "react-bootstrap";
import AddButton from "../../shared/AddButton";
import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";
const Discounts = () => {
  const check = <CheckIcon className={"checkbox"} />;
  const discountsMockData = [
    {
      title: "Home Owners discounts",
      body: "Save up to 10%",
    },
    {
      title: "Currently insured discounts",
      body: "Save up to 10%",
    },
    {
      title: "Multi-car discounts",
      body: "Save up to 10%",
    },
  ];

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            <p>
              <strong>Discounts</strong>
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            {discountsMockData.map((discount, i) => {
              return (
                <CustomCard
                  icon={check}
                  title={discount.title}
                  body={discount.body}
                  key={i + 1}
                />
              );
            })}
          </Col>
        </Row>
          </Container>
          <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            <AddButton text="Select Discount"/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Discounts;
