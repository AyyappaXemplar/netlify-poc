import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

import history from "./../../history";
import { rateQuote } from "../../actions/rates";

import DriverDetailsReview from "./quoteReview/DriverDetailsReview";
import PolicyCoverages from "./quoteReview/PolicyCoverages";
import Vehicles from "./quoteReview/Vehicles";
import Discounts from "./quoteReview/Discounts";
import DriverReview from "./../bind-online/driver/DriverReview";
import TitleRow from "./../shared/TitleRow";
import BadgeText from "./../shared/BadgeText";

export const QuoteReview = () => {
  const ratingQuote = useSelector((state) => state.state.ratingQuote);
  const dispatch = useDispatch();
  const [formSubmited, setFormSumbmitted] = useState(false);
  const drivers = useSelector((redux) => {
    return redux.data.quote.drivers;
  });

  useEffect(() => {
    if (formSubmited && !ratingQuote) history.push("/bol/rate");
  }, [formSubmited, ratingQuote]);

  const submitQuote = () => {
    setFormSumbmitted(true);
    dispatch(rateQuote(null, { type: "final_quote" }));
  };

  return (
    <>
      <Container>
        <TitleRow
          title={`Everything Looks Good?`}
          subtitle={`Review what you’ve added so far. If everything looks good, you can
              submit to get your policy.`}
        />

        <Row className="justify-content-center">
          <Col md={6} className="d-flex row justify-content-between">
            <p>
              <strong>Driver Details</strong>
            </p>
            <button type="button" className="btn btn-link">
              Edit
            </button>
          </Col>
        </Row>

        <DriverDetailsReview />

        <PolicyCoverages />
        
        <Vehicles />

        <Row className={`justify-content-center`}>
          <Col xs={6}>
            {drivers.map((driver, index) => {
              return <DriverReview driver={driver} key={index + 1}/>;
            })}
          </Col>
        </Row>
        <Discounts />
        <Row className={`justify-content-center mb-5`}>
          <Col
            className={`d-flex flex-row-reverse justify-content-center align-items-center`}
            xs={6}
          >
            <label htmlFor="disclaimer" className={`ml-2 mb-0`}>
              I agree to the{" "}
              <a href="http://www.google.com">following statements</a> to order
              a Motor Vehicle Report.
            </label>
            <input type="checkbox" id="disclaimer" name="disclainer" />
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col xs={6}>
            <strong>Note:</strong> If you cannot agree with the following
            statements please contact our agents in regards to any questions.
            When calling, please have your quote number ready.
          </Col>
        </Row>
        <Row className={`justify-content-center mb-2`}>
          <Col xs={6}>
            <Button
              onClick={submitQuote}
              className="rounded-pill"
              size="lg"
              block
            >
              {ratingQuote ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Get a Quote"
              )}
            </Button>
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
          <Col xs={6} className="justify-content-center d-flex row">
            <button type="button" className="btn btn-link">
              Cancel & Return
            </button>
          </Col>
        </Row>

        <BadgeText />

        <Row className="justify-content-center mb-5">
          <Col
            className="justify-content-center"
            xs={6}
            style={{ textAlign: "center" }}
          >
            <p>
              <strong>Contact us</strong>
            </p>
            <button type="button" className="btn btn-link" href="tel:8583585605">
              (844) 358-5605
            </button>
            <br />
            <button
              type="button"
              className="btn btn-link"
              href="mailto:agent@insureonline.com"
            >
              agent@insureonline.com
            </button>
            <p>
              6640 S Cicero Ave
              <br /> Bedford Park, IL 60638
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
