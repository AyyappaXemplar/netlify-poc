import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";
import { ReactComponent as InfoIcon } from "../../../images/Info.svg";

import stackIcon from "../../../images/icon-stacks.svg"
export default function PolicyCoverages() {
  const check = <CheckIcon className={"checkbox"} />;
  const info = <InfoIcon className={"infoIcon"} />;

  const policies = [
    {
      type: "Bodily Injury",
      price: "$25k / $50k",
    },
    {
      type: "Property Damage",
      price: "$50k",
    },
    {
      type: "Uninsured Motorist (BI)",
      price: "$250k",
    },
    {
      type: "Underinsured Motorist (BI)",
      price: "$250k",
    },
  ];

  const renderPolicies = () => {
    return policies.map((policy, index) => {
      return (
        <div
          className="quote-item-card quote-item-card__policy-terms d-flex align-items-center"
          key={index + 1}
        >
          <div className={"mr-3 text-success"}>{check}</div>
          <div className="d-flex flex-row flex-grow-1 ">
            <div className="title col-xs-12">
              {policy.type}
              {info ? info : null}
            </div>
            <div className="price col-xs-12">{policy.price}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Container className={"col-6"}>
        <Row>
          <Col>
            <p>
              <strong>Policy Coverages</strong>
            </p>
          </Col>
        </Row>
      </Container>
      <Container className={"bg-white shadow rounded col-xs-12 col-md-6 mb-6"} style={{padding: "10px 10px 20px"}}>
        <Row className="justify-content-center">
          <Col>{renderPolicies()}</Col>
        </Row>
        <div className="d-flex flex-row align-items-center coverage-note">
          <div className="d-flex justify-content-center col-xs-12 col-md-2"><Image width="28px" height="32px"  src={stackIcon}/></div>
          
          <div>Full coverage offers both coverage for the people and property you hurt or damage – along with you or your vehicle.</div>
        </div>
      </Container>
    </>
  );
}
