import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector }   from 'react-redux'
import { withTranslation }     from 'react-i18next'
import { useLocation, Link }   from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import history           from "../../history"
import mixpanel          from "../../config/mixpanel"

import Carrier           from "../rate/Carrier"
import RateDriver        from "../rate/Driver"
import RateVehicle       from "../rate/Vehicle"
import PricingTabs       from '../rate/PricingTabs'
import RateIntro         from '../rate/RateIntro'

import SpinnerScreen     from "../shared/SpinnerScreen"
import TransitionModal   from "../shared/TransitionModal"
import EmailQuoteModal   from "../shared/EmailQuoteModal.js"

import {
  getAllCarriers,
  rateQuote
}                        from '../../actions/rates'
import { getQuote }      from '../../actions/quotes'

import {
  ReactComponent
    as BackIcon
}                        from '../../images/chevron-left.svg';

import "./rate.scss"

export function useGetRatesAndCarriers(quoteId) {

  const rates                  = useSelector(state => state.data.rates)
  const carriers               = useSelector(state => state.data.carriers)
  const ratingQuote            = useSelector(state => state.state.ratingQuote)
  const gettingCarriersInfo    = useSelector(state => state.state.gettingCarriersInfo)
  const dispatch               = useDispatch()

  //load rates and carriers
  useEffect(() => {
    
    if (!ratingQuote && !rates.length){
      mixpanel.track('Submitted for rate')
      dispatch(rateQuote(quoteId))
    }
    if (!gettingCarriersInfo && !carriers.length) {
      dispatch(getAllCarriers())
    }
  }, [rates, carriers, ratingQuote, gettingCarriersInfo, dispatch, quoteId])

  return [rates, carriers]
}

export function useRate(rates, url = '/quotes/review') {
  const useQuery  = () => new URLSearchParams(useLocation().search)
  const rateIndex = useQuery().get('index') || 0
  const dispatch  = useDispatch()

  const [rate, setRate] = useState(undefined)
  useEffect(() => {
    // Error handling
    // If there is a rater_error, then we'll push them to the
    // contact-us page, otherwise, we'll display on the review page
    if (rates.errors) {
      if (rates.errors.find(error => error.code === "rater_error")) {
        history.push('/contact-us')
      } else {
        history.push(url)
      }
    } else {
      setRate(rates[rateIndex])
    }
  }, [dispatch, rates, rateIndex, url])

  return rate
}

export function useCarrier(rate, carriers) {
  const [carrier, setCarrier] = useState(undefined)
  useEffect(() => {
    if (rate && carriers?.length) {
      setCarrier(carriers.find(carrier => carrier.tag === rate.carrier_id))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [rate, carriers])

  return carrier
}

function Rate({ t, match }) {
  const updatingVehicleCoverage  = useSelector(state => state.state.updatingVehicleCoverage)
  const purchasingQuote          = useSelector(state => state.state.purchasingQuote)
  const quote                    = useSelector(state => state.data.quote)
  const quoteId                  = match.params.quoteId
  localStorage.setItem('siriusQuoteId', quoteId)
  const [rates, carriers]        = useGetRatesAndCarriers(quoteId)
  const rate                     = useRate(rates)
  const carrier                  = useCarrier(rate, carriers)
  const [submittedPurchasing,
    setSubmittedPurchasing]      = useState(false)
  const [showEmailQuoteModal,
    setShowEmailQuoteModal]      = useState(false);
  const dispatch  = useDispatch()

  useEffect(() => {
    if (rate) mixpanel.track('Rated')
  }, [rate])

  useEffect(() => {
    if (!quote.id) {
      dispatch(getQuote(quoteId))
    }
  }, [quote.id, quoteId, dispatch])

  useEffect(() => {
    if (!submittedPurchasing && purchasingQuote)
      setSubmittedPurchasing(true)
    else if (!purchasingQuote && submittedPurchasing ) {
      history.push('/bol/policy-details')
    }
  }, [submittedPurchasing, purchasingQuote, quote.id])

  if (!quote.id) return <SpinnerScreen title={t('submit.title')} />

  if (!updatingVehicleCoverage && (!rate || !carrier)) return <SpinnerScreen title={t('submit.title')} />

  return (
    <>
      <Container fluid className="container-rate-overview bg-light">

        <Container className="p-0 rater-navigation">
          <div className="d-flex">
            <Link className="rounded-pill btn btn-outline-dark" to={'/quotes/review'}>
              <BackIcon />
              Edit Quote
            </Link>

            { rates && rates.length > 1 &&
              <Link
                className="rounded-pill btn btn-outline-secondary ml-auto"
                to={`/rates/${quoteId}/compare`}
              >
                {t('quotes:rate.otherRates')}
              </Link>
            }
          </div>
        </Container>

        <Container className="p-0 py-4 container-rate-overview__inner">
          <Row>
            <Col xs={{order: 1, span: 12}} lg={{span: 6, order: 0}}>
              <RateIntro carrier={carrier} classes="d-none d-lg-block" />

              <div className="border p-4">
                <Carrier carrier={carrier} />
              </div>
            </Col>
            <Col xs={{order: 0, span: 12}} lg={{span: 6, order: 1}}>
              <RateIntro carrier={carrier} classes="d-block d-lg-none" />
                <PricingTabs
                   quote={quote}
                   rate={rate}
                   setShowEmailQuoteModal={setShowEmailQuoteModal}
                   setSubmittedPurchasing={setSubmittedPurchasing}
                />
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="container-rate-details">
        <Container className="p-0 container-rate-details__inner">
          <Row>
            <Col>
              <h5 className="mb-4 font-weight-bolder">Vehicles Insured by Policy</h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap mb-5">
            { rate.vehicles.map((vehicle, index) => (
                <Col lg={6} key={index} className="mb-4 d-flex">
                  <RateVehicle vehicle={vehicle} />
                </Col>
              ))
            }
          </Row>

          <Row>
            <Col>
              <h5 className="mb-4 font-weight-bolder">Drivers Insured by Policy</h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap">
            { quote.drivers.map((driver, index) => (
                <Col lg={6} key={index} className="mb-4 d-flex">
                  <RateDriver driver={driver}/>
                </Col>
              ))
            }
          </Row>
        </Container>
      </Container>

      <Container fluid className="container-rate-details text-center pt-0">
        <Col lg={6} className="mx-auto">
          <p className="text-med-dark font-italic"><small>We assume you have a good driving record. Rates may changed based on MVR or additional information required during the buy online process.</small></p>
        </Col>
      </Container>
      <TransitionModal show={submittedPurchasing} />
      <EmailQuoteModal show={showEmailQuoteModal} setShow={setShowEmailQuoteModal}/>
    </>
  )
}

export default withTranslation(['quotes'])(Rate);
