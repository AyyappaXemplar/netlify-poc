import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

import history from "./../../history";
import { rateQuote } from "../../actions/rates";

import DriverDetailsReview from "./quoteReview/DriverDetailsReview";
import PolicyCoverages     from "./quoteReview/PolicyCoverages";
import Vehicles            from "./quoteReview/Vehicles";
import Discounts           from "../quote/Discounts";
import Drivers             from "./quoteReview/Drivers";
import TitleRow            from "./../shared/TitleRow";
import BadgeText           from "../shared/BadgeText";
import StartOverButton     from "../shared/StartOverButton";

export const QuoteReview = () => {
  const quote = useSelector(state => state.data.quote);
  const ratingQuote = useSelector(state => state.state.ratingQuote);
  const dispatch = useDispatch();
  const [formSubmited, setFormSumbmitted] = useState(false);

  useEffect(() => {
    if (formSubmited && !ratingQuote) history.push("/bol/rate");
  }, [formSubmited, ratingQuote]);

  const submitQuote = () => {
    setFormSumbmitted(true);
    dispatch(rateQuote(null, { type: "final_quote" }));
  };

  return (
    <Container>
      <TitleRow
        title={'Everything Looks Good?'}
        subtitle={`Review what you’ve added so far. If everything looks good, you can
            submit to get your policy.`}
      />

      <Row className={`justify-content-center mb-5`}>
        <Col xs={6}>
          <DriverDetailsReview quote={quote}/>

          <PolicyCoverages quote={quote}/>

          <Vehicles vehicles={quote.vehicles}/>

          <Drivers drivers={quote.drivers}/>

          <Discounts quote={quote}/>
        </Col>
      </Row>

      <Row className={`justify-content-center mb-5`}>
        <Col
          className={`d-flex flex-row-reverse justify-content-center align-items-center`}
          xs={6}
        >
          <label htmlFor="disclaimer" className={`ml-2 mb-0`}>
            I agree to the{" "}
            <a className="text-info" href="http://www.google.com">following statements</a> to order
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
          <Button onClick={submitQuote}
            className="rounded-pill" size="lg" block>
            { ratingQuote ? (
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
          <StartOverButton/>
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
          <button type="button" className="btn btn-link  text-info" href="tel:8583585605">
            (844) 358-5605
          </button>
          <br />
          <button
            type="button"
            className="btn btn-link text-info"
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
  );
};
