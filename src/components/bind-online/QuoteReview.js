import React, { useState, useEffect } from "react";
import { useSelector, useDispatch }     from "react-redux";
import { Container, Row, Col,
         Button }          from "react-bootstrap";
import { Link }            from "react-router-dom";

import DriverDetailsReview from "./quoteReview/DriverDetailsReview";
import PolicyCoverages     from "./quoteReview/PolicyCoverages";
import Vehicles            from "./quoteReview/Vehicles";
import Discounts           from "../quote/Discounts";
import Drivers             from "./quoteReview/Drivers";
import TitleRow            from "../shared/TitleRow";
import BadgeText           from "../shared/BadgeText";
import StartOverButton     from "../shared/StartOverButton";
import ReviewModal         from "./quoteReview/ReviewModal";
import ErrorDisplay        from '../shared/ErrorDisplay';
import history             from "../../history"; 
import {rateQuote}           from "../../actions/rates"

import { averageCoverageStrength }   from '../../services/rate-quality'

export const QuoteReview = () => {
  const quote = useSelector(state => state.data.quote);
  const rates = useSelector(state => state.data.rates)
  const [showReviewModalState, updateShowModalState] = useState(false);
  const [agreeToMvr, updateAgreeToMvr] = useState(process.env.NODE_ENV === "development")
  const coverageStrength = averageCoverageStrength(quote);
  const dispatch = useDispatch()
  const ratingQuote = useSelector(redux => redux.state.ratingQuote)
  const [submitted, udpdateSubmitted] = useState(false)

  useEffect(() => {

    if (submitted && !ratingQuote) history.push(`/bol/quotes/${quote.id}/rates`);
    
  }, [ratingQuote, submitted, quote.id])

  const handleSubmit = () => {
    dispatch(rateQuote(null, {type: "final_quote"}))
    udpdateSubmitted(true)
  }

  return (
    <Container>
      <TitleRow
        title={"Everything Looks Good?"}
        subtitle={`Review what you’ve added so far. If everything looks good, you can
            submit to get your policy.`}
      />

      <Row className={`justify-content-center mb-5`}>
        <Col lg={6}>
          <ErrorDisplay rates={rates}/>
          <DriverDetailsReview quote={quote} />

          <div>
            <label>Policy Coverages</label>
            <Link className="text-info float-right" to="/bol/coverages/edit">
              Edit
            </Link>
          </div>
          <PolicyCoverages quote={quote} strength={coverageStrength}/>

          <Vehicles vehicles={quote.vehicles} displayCoverageSelector={false} />

          <Drivers drivers={quote.drivers} />

          <Discounts quote={quote} />
        </Col>
      </Row>

      <Row className={`justify-content-center mb-5`}>
        <Col
          className={`d-flex flex-row-reverse justify-content-center align-items-center`}
          lg={6}
        >
          <div className="custom-control custom-checkbox">
            <input type="checkbox" checked={agreeToMvr} className="custom-control-input" id="disclaimer"
              onChange={()=>updateAgreeToMvr(!agreeToMvr) }/>
            <label className="ml-2 mb-0 custom-control-label" htmlFor="disclaimer">
              <span className="">I agree to the </span>
              <Button
                className="text-info p-0 font-weight-bolder align-baseline"
                variant="link"
                onClick={() => updateShowModalState(true)}
              >
                following statements
              </Button> <span className="">to order a Motor Vehicle Report.</span>
            </label>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs={6}>
          <strong>Note:</strong> If you cannot agree with the following
          statements please contact our agents in regards to any questions. When
          calling, please have your quote number ready.
        </Col>
      </Row>

      <Row className={`justify-content-center mb-2`}>
        <Col md={8} lg={6}>
          <Button
            className={`rounded-pill btn btn-primary btn-block btn-lg mb-3 ${agreeToMvr ? '' : "disabled"}`}
            onClick={handleSubmit}
            size="lg"
          >
            Get a Quote
          </Button>
          <StartOverButton />
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
          <button
            type="button"
            className="btn btn-link  text-info"
            href="tel:8583585605"
          >
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
      <ReviewModal
        showReviewModalState={showReviewModalState}
        updateShowModalState={updateShowModalState}
      />
    </Container>
  );
};
