import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";
import { ReactComponent as InfoIcon } from "../../../images/Info.svg";

import IconListItem from "../../shared/bind-online/IconListItem";
import stackIcon from "../../../images/icon-stacks.svg";
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
        <IconListItem
          index={index}
          header={policy.type}
          infoIcon={info}
          copy={policy.price}
          check={check}
          key={index}
          flexRow={true}
        />
      );
    });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            <p>
              <strong>Policy Coverages</strong>
            </p>
          </Col>
        </Row>
      </Container>
      <Container className={"mb-5"} style={{ padding: "10px 10px 20px" }}>
        <Row className="justify-content-center">
          <Col className={"col-xs-12 col-md-6"}>
            {renderPolicies()}
            <div className="d-flex flex-row align-items-center coverage-note">
              <div className="d-flex justify-content-center col-xs-12 col-md-2">
                <Image width="28px" height="32px" src={stackIcon} />
              </div>
              <div>
                Full coverage offers both coverage for the people and property
                you hurt or damage – along with you or your vehicle.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
