import React, { useState, useEffect }   from "react"; 
import { useSelector }     from "react-redux";
import { Container, Row, Col,
        Button }                        from "react-bootstrap";
import { Link }                         from "react-router-dom";
import DriverDetailsReview              from "./quoteReview/DriverDetailsReview";
import PolicyCoverages                  from "./quoteReview/PolicyCoverages";
import Vehicles                         from "./quoteReview/Vehicles";
import Discounts                        from "../quote/Discounts";
import Drivers                          from "./quoteReview/Drivers";
import TitleRow                         from "../shared/TitleRow";
import BadgeText                        from "../shared/BadgeText";
import StartOverButton                  from "../shared/StartOverButton";
import ReviewModal                      from "./quoteReview/ReviewModal";
import ErrorDisplay                     from '../shared/ErrorDisplay';
import { averageCoverageStrength }      from '../../services/rate-quality'
import validateDrivers                  from '../../validators/bind-online/DriverForm';
import { withTranslation } from "react-i18next";
import { Helmet } from 'react-helmet'
import mixpanel from "../../config/mixpanel"

export const QuoteReview = withTranslation(["quotes"])(({ t }) => {

  useEffect(() => mixpanel.track("Pageview", {
    "Page Title": "Review All Your Information",
    "Section": "Bind Online"
  }), [])

  const quote = useSelector(state => state.data.quote);
  const rates = useSelector(state => state.data.rates)
  const [showReviewModalState, updateShowModalState] = useState(false);
  const [agreeToMvr, updateAgreeToMvr] = useState(process.env.NODE_ENV === "development")
  const coverageStrength = averageCoverageStrength(quote);

  const validDrivers = quote.drivers.map((driverObj) => {
    return { ...driverObj, isValid: !validateDrivers(driverObj) }
  });

  return (
    <Container className="pt-base">
      <Helmet>
        <title>Application review | InsureOnline.com</title>
      </Helmet>
      <TitleRow
        title={t("bolReview.title")}
        subtitle={t("bolReview.subtitle")}
      />

      <Row className="justify-content-center mb-5">
        <Col lg={6}>
          <ErrorDisplay object={rates}/>
          <DriverDetailsReview quote={quote} />

          <div>
            <label>{t("policyCoverages")}</label>
          </div>
          <PolicyCoverages quote={quote} strength={coverageStrength}/>

          <Vehicles vehicles={quote.vehicles} displayCoverageSelector={false} />

          <Drivers drivers={validDrivers} />

          <Discounts quote={quote} />
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col
          className="d-flex flex-row-reverse justify-content-center align-items-center"
          lg={6}
        >
          <div className="custom-control custom-checkbox">
            <input type="checkbox" checked={agreeToMvr} className="custom-control-input" id="disclaimer"
              onChange={()=>updateAgreeToMvr(!agreeToMvr) }/>
            <label className="ml-2 mb-0 custom-control-label" htmlFor="disclaimer">
              <span className="">{t("bolQuotesReview.iAgreeToThe")} </span>
              <Button
                className="text-primary p-0 font-weight-bolder align-baseline"
                variant="link"
                onClick={() => updateShowModalState(true)}
              >
                {t("bolQuotesReview.followingStatements")}
              </Button> <span className="">{t("bolQuotesReview.toOrderAMVR")}</span>
            </label>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs={6}>
          <strong>{t("bolQuotesReview.note")}:</strong> {t("bolQuotesReview.noteBody")}
        </Col>
      </Row>

      <Row className={`justify-content-center mb-2`}>
        <Col md={8} lg={6}>
          <Link
            className={`rounded-pill btn btn-primary btn-block btn-lg mb-3 ${agreeToMvr ? '' : "disabled"}`}
            size="lg"
            to={`/bol/quotes/${quote.id}/rates`}
          >
            {t("bolQuotesReview.getFinalQuote")}
          </Link>
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
            <strong>{t("bolQuotesReview.contactUs")}</strong>
          </p>
          <button
            type="button"
            className="btn btn-link  text-primary"
            href="tel:8583585605"
          >
            (844) 358-5605
          </button>
          <br />
          <button
            type="button"
            className="btn btn-link text-primary"
            href="mailto:agent@insureonline.com"
          >
            agent@insureonline.com
          </button>
          <p>
            6640 S. Cicero Ave
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
});
