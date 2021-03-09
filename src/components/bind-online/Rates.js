import React, { useState, useEffect }   from 'react'
import { useSelector, useDispatch }     from 'react-redux'
import { withTranslation }              from 'react-i18next'
import { Link }                         from 'react-router-dom'
import { Container, Row, Col }          from 'react-bootstrap'

import mixpanel                         from "../../config/mixpanel"

import Carrier                          from "../rate/Carrier"
import RateDriver                       from "../rate/Driver"
import RateVehicle                      from "../rate/Vehicle"
import PricingTab                       from './rate/PricingTab'
import RateIntro                        from '../rate/RateIntro'
import SpinnerScreen                    from "../shared/SpinnerScreen"
import EmailQuoteModal                  from "../shared/EmailQuoteModal.js"

import { ReactComponent as BackIcon }   from '../../images/chevron-left.svg';

import "../main/rate.scss"
import PriceBreakdown                   from '../shared/bind-online/PriceBreakdown'
import PolicyCoverage                   from '../bind-online/quoteReview/PolicyCoverages'

import {
  useGetRatesAndCarriers,
  useCarrier, useRate
}                                       from '../main/Rate'
import { bindQuote }                    from '../../actions/quotes' 


function Rates({ t, match }) {

  const quote                    = useSelector(state => state.data.quote)
  const updatingQuoteInfo        = useSelector(redux => redux.state.updatingQuoteInfo)
  const quoteId                  = match.params.quoteId
  const [rates, carriers]        = useGetRatesAndCarriers(quoteId)

  const rate                     = useRate(rates, '/bol/quotes/review')
  const carrier                  = useCarrier(rate, carriers)
  const [showEmailQuoteModal,
    setShowEmailQuoteModal]      = useState(false);
  const dispatch                 = useDispatch();

  useEffect(() => {

    dispatch(bindQuote())
    
   }, [dispatch])


  useEffect(() => {
    if (rate) mixpanel.track('Rated')
  }, [rate])

  if (updatingQuoteInfo || !carrier || !rate) {
    return <SpinnerScreen title={t('submit.title')} />
  }
  return (
    <>
      <Container fluid className="container-rate-overview bg-light">
        <Container className="p-0 rater-navigation">
          <div className="d-flex">
            <Link
              className="rounded-pill btn btn-outline-dark"
              to={"/quotes/review"}
            >
              <BackIcon />
              Edit Quote
            </Link>

            {rates && rates.length > 1 && (
              <Link
                className="rounded-pill btn btn-outline-secondary ml-auto"
                to={`/rates/${quoteId}/compare`}
              >
                {t("quotes:rate.otherRates")}
              </Link>
            )}
          </div>
        </Container>

        <Container className="p-0 py-4 container-rate-overview__inner">
          <Row>
            <Col xs={{ order: 1, span: 12 }} lg={{ span: 6, order: 0 }}>
              <RateIntro carrier={carrier} classes="d-none d-lg-block" />

              <Carrier carrier={carrier} />
            </Col>
            <Col xs={{ order: 0, span: 12 }} lg={{ span: 6, order: 1 }}>
              <RateIntro carrier={carrier} classes="d-block d-lg-none" />
              <PricingTab
                quote={quote}
                rate={rate}
                setShowEmailQuoteModal={setShowEmailQuoteModal}
              />
            </Col>
          </Row>
        </Container>

      </Container>
      <Container fluid className="container-rate-details">
        <Container className="p-0 container-rate-details__inner">
          <Row>
            <Col xs={12} lg={6}>
              <h5 className="font-weight-bolder mb-4">Price Breakdown</h5>
              <PriceBreakdown rate={rate} />
            </Col>
            <Col xs={12} lg={6}>
              <h5 className="font-weight-bolder mb-4">PolicyCoverage</h5>
              <PolicyCoverage quote={quote} showBottomText={false}/>
            </Col>
          </Row>

          <Row>
            <Col>
              <h5 className="mb-4 font-weight-bolder">
                Vehicles Insured by Policy
              </h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap mb-5">
            {rate.vehicles.map((vehicle, index) => (
              <Col lg={6} key={index} className="mb-4 d-flex">
                <RateVehicle
                  vehicle={vehicle}
                  displayCoverageSelector={false}
                  excludePolicyCoverages={true}
                  fullInfo={true}
                  isBolQuotesRates={true}
                />
              </Col>
            ))}
          </Row>

          <Row>
            <Col>
              <h5 className="mb-4 font-weight-bolder">
                Drivers Insured by Policy
              </h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap">
            {quote.drivers.map((driver, index) => (
              <Col lg={6} key={index} className="mb-4 d-flex">
                <RateDriver driver={driver} isBolQuotesRates={true} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      <Container fluid className="container-rate-details text-center pt-0">
        <Col lg={6} className="mx-auto">
          <p className="text-med-dark font-italic">
            <small>
              We assume you have a good driving record. Rates may changed based
              on MVR or additional information required during the buy online
              process.
            </small>
          </p>
        </Col>
      </Container>
      <EmailQuoteModal
        show={showEmailQuoteModal}
        setShow={setShowEmailQuoteModal}
      />
    </>
  );
}

export default withTranslation(['quotes'])(Rates);
