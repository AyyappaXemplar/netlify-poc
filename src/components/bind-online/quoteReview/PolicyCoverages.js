import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";

import IconListItem from "../../shared/bind-online/IconListItem";

import { ReactComponent as CheckIcon } from "../../../images/check-circle-fill.svg";
import { ReactComponent as InfoIcon }  from "../../../images/Info.svg";
import stackIcon                       from "../../../images/icon-stacks.svg";

import { getPolicyCoveragesFromQuote, getCoverageValues } from '../../../services/coverages'

export default function PolicyCoverages({ quote }) {
  const check = <CheckIcon className={"checkbox"} />;
  const info = <InfoIcon className={"infoIcon"} />;

  const coverages = getPolicyCoveragesFromQuote(quote)

  const renderPolicies = () => {
    return coverages.map((coverage, index) => {
      return (
        <IconListItem
          index={index}
          header={coverage.description}
          infoIcon={info}
          copy={getCoverageValues(coverage)}
          check={check}
          key={index}
          flexRow={true}
          shadow={false}
        />
      );
    });
  };

  return (
    <>
        <Row className="justify-content-center">
          <Col className="col-6">
            <p>
              <strong>Policy Coverages</strong>
            </p>
          </Col>
        </Row>
      <Container className={"mb-5"}>
        <Row className="justify-content-center">
          <Col className={"col-xs-12 col-md-6 bg-white p-3 shadow rounded"}>
            {renderPolicies()}
            <div className="d-flex flex-row align-items-center coverage-note mt-3">
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
