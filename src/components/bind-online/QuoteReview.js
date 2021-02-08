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
          <Col md={6} className={"d-flex justify-content-between"}>
            <p>
              <strong>Driver Details</strong>
            </p>

            <strong>Edit</strong>
          </Col>
        </Row>

        <DriverDetailsReview />

        <PolicyCoverages />
        <Vehicles />
        <Row className={`justify-content-center`}>
          <Col xs={6}>
            {drivers.map((driver, index) => {
              return <DriverReview driver={driver} />;
            })}
          </Col>
        </Row>
        <Discounts />

        <Row
          style={{ display: "flex", justifyContent: "center", margin: "25px" }}
        >
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
      </Container>
    </>
  );
};
