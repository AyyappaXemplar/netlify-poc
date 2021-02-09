import React                   from "react";
import { Row, Col } from "react-bootstrap";

import CustomCard from "../../shared/CustomCard";
import AddButton  from "../../shared/AddButton";

import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";

const Discounts = () => {
  const check = <CheckIcon className={"checkbox"} />;
  const discountsMockData = [
    { title: "Home Owners discounts", body: "Save up to 10%", applied: quote.homeowner },
    { title: "Currently insured discounts", body: "Save up to 10%", applied: quote.pay_in_full },
    { title: "Multi-car discounts", body: "Save up to 10%", applied: quote.vehicles.length > 1 }
  ];

  return (
    <>
      <Row className="justify-content-center">
        <Col className="col-6">
          <p>
            <strong>Discounts</strong>
          </p>
        </Col>
      </Row>
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
      <Row className="justify-content-center">
        <Col className="col-6">
          <AddButton text="Select Discount"/>
        </Col>
      </Row>
    </>
  );
};

export default Discounts;
