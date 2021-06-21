import React, { useState, useEffect }   from 'react'
import { useSelector, useDispatch }     from 'react-redux'
import { withTranslation }              from 'react-i18next'
import { Link }                         from 'react-router-dom'
import { Container, Row, Col }          from 'react-bootstrap'
import mixpanel                         from "../../config/mixpanel"
import history                          from "../../history"
import { getAllCarriers }               from "../../actions/rates"
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
import { rateFinalQuote }               from '../../actions/rates'
import { getQuote }      from '../../actions/quotes'
import { Helmet } from 'react-helmet'
import { 
  monthlyPaymentOption, 
  payInFullOption, 
  priceDisplay 
} from '../../services/payment-options';

function useGetRate(quoteId) {
  const dispatch  = useDispatch()
  const { rates } = useSelector(state => state.data)
  const [rate, setRate] = useState(undefined)

  useEffect(() => {
    if (rates.errors) {
      if (rates.errors.find(error => error.code === "rater_error")) {
        mixpanel.track('Rater error')
        history.push('/contact-us')
      } else {
        history.push('/bol/quotes/review')
      }
    } else if (!rates.length) {
      // mixpanel.track('Submitted for rate #2')
      dispatch(rateFinalQuote(quoteId))
    } else {
      setRate(rates[0])
    }
  }, [rates, dispatch, quoteId])
  return rate
}

export function useGetCarrier(carrier_id) {
  const dispatch              = useDispatch()
  const gettingCarriersInfo   = useSelector(state => state.state.gettingCarriersInfo)
  const { carriers }          = useSelector(state => state.data)
  const [carrier, setCarrier] = useState(undefined)

  useEffect(() => {
    if (!carrier_id) {
      return
    } else if (!gettingCarriersInfo && !carriers.length) {
      dispatch(getAllCarriers())
    } else if (carriers?.length) {
      setCarrier(carriers.find(carrier => carrier.tag === carrier_id))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [carrier_id, carriers, dispatch, gettingCarriersInfo])

  return carrier
}

export function sortVehicles(vehicles) {
  vehicles.sort(function(veh1, veh2) {
    return new Date(veh1.created_at) - new Date(veh2.created_at)
  })
  return vehicles
}

function Rates({ t, match }) {
  const quote             = useSelector(state => state.data.quote)
  const updatingQuoteInfo = useSelector(redux => redux.state.updatingQuoteInfo)
  const quoteId           = match.params.quoteId
  localStorage.setItem('siriusQuoteId', quoteId)
  const rate              = useGetRate(quoteId)
  const carrier           = useGetCarrier(rate?.carrier_id)
  const [showEmailQuoteModal, setShowEmailQuoteModal] = useState(false);
  const dispatch  = useDispatch()

  useEffect(() => {
    mixpanel.track("Bind Online Quote Completed")

    rate && mixpanel.track("Pageview", {
      "Page Title": "Bind Online Quote Complete",
      "Section": "Bind Online",
      "Number Of Drivers": quote.drivers.length,
      "Number Of Vehicles": quote.vehicles.length,
      "Quote Number": rate.id,
      "Quote UUID": rate.quote_id,
      "Quoted Price": quote.pay_in_full ? priceDisplay(payInFullOption(rate)) : priceDisplay(monthlyPaymentOption(rate)),
      "Pay In Full": quote.pay_in_full
    })
  }, [quote.drivers.length, quote.vehicles.length, rate, quote.pay_in_full])

  useEffect(() => {
    if (rate) mixpanel.track('Rated')
  }, [rate])

  useEffect(() => {
    if (!quote.id) {
      dispatch(getQuote(quoteId))
    }
  }, [quote.id, quoteId, dispatch])

  if (updatingQuoteInfo || !carrier || !rate || !quote) {
    return <SpinnerScreen title={t('submit.title')} mvrCopy={t("mvrCopy")}/>
  }
  const sortedVehicles = sortVehicles(rate.vehicles)

  return (
    <>
      <Container fluid className="container-rate-overview bg-light">
        <Helmet>
          <title>Final quote | InsureOnline.com</title>
        </Helmet>
        <Container className="p-0 rater-navigation">
          <div className="d-flex">
            <Link
              className="rounded-pill btn btn-outline-dark"
              to={"/bol/quotes/review"}
            >
              <BackIcon />
              {t("editQuote")}
            </Link>
          </div>
        </Container>

        <Container className="p-0 py-4 container-rate-overview__inner">
          <Row>
            <Col xs={{ order: 1, span: 12 }} lg={{ span: 6, order: 0 }}>
              <RateIntro carrier={carrier} bolTitle={true} classes="d-none d-lg-block" />
              <div className="border p-4">
                <Carrier carrier={carrier} />
              </div>
            </Col>
            <Col xs={{ order: 0, span: 12 }} lg={{ span: 6, order: 1 }}>
              <RateIntro carrier={carrier} bolTitle={true} classes="d-block d-lg-none" />
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
              <h5 className="font-weight-bolder mb-4">{t("priceBreakdown")}</h5>
              <PriceBreakdown rate={rate} />
            </Col>
            <Col xs={12} lg={6}>
              <h5 className="font-weight-bolder mb-4">{t("policyCoverage")}</h5>
              <PolicyCoverage quote={quote} showBottomText={false}/>
            </Col>
          </Row>

          <Row>
            <Col>
              <h5 className="mb-4 font-weight-bolder">
                {t("vehiclesInsuredByPolicy")}
              </h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap mb-5">
            {sortedVehicles.map((vehicle) => (
              <Col lg={6} key={vehicle.id} className="mb-4 d-flex">
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
                {t("driversInsuredByPolicy")}
              </h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap">
            {quote.drivers.map((driver) => (
              <Col lg={6} key={driver.id} className="mb-4 d-flex">
                <RateDriver driver={driver} isBolQuotesRates={true} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      <EmailQuoteModal
        show={showEmailQuoteModal}
        setShow={setShowEmailQuoteModal}
      />
    </>
  );
}

export default withTranslation(['quotes'])(Rates);
