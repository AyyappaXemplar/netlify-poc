import React, { useState, useEffect, useCallback } from 'react'
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
import EmailQuoteOnly    from "../shared/EmailQuoteOnly"

import {
  getAllCarriers,
  rateQuote
}                        from '../../actions/rates'
import { getQuote, updateQuote, sendQuoteByEmail, setQuickQuoteInitialLoad } from '../../actions/quotes'
import {
  ReactComponent
    as BackIcon
}                        from '../../images/chevron-left.svg';
import { Helmet } from "react-helmet"
import "./rate.scss"
import {
  monthlyPaymentOption,
  payInFullOption,
  priceDisplay
} from '../../services/payment-options';

export function useGetRatesAndCarriers(quoteId) {

  const rates                  = useSelector(state => state.data.rates)
  const carriers               = useSelector(state => state.data.carriers)
  const ratingQuote            = useSelector(state => state.state.ratingQuote)
  const gettingCarriersInfo    = useSelector(state => state.state.gettingCarriersInfo)
  const dispatch               = useDispatch()

  //load rates and carriers
  useEffect(() => {

    if (!ratingQuote && !rates.length){
      // mixpanel.track('Submitted for rate')
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
      if(rates.length > 1) {
        setRate(rates[rateIndex])
      } else {
        setRate(rates[0])
      }
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

export function sortVehicles(vehicles) {
  vehicles.sort(function(veh1, veh2) {
    return new Date(veh1.created_at) - new Date(veh2.created_at)
  })
  return vehicles
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
  const [showOnlyEmailQuote,setShowOnlyEmailQuote] = useState(false)
  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'
  const defaultActiveKey  = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  // const initial_rate = useSelector(state => state.data.rates[0])
  const all_rates = useSelector(state => state.data.rates)
  const quickQuoteEmail = useSelector(state => state.data.quickQuoteEmail)
  const dispatch  = useDispatch()

  const update_quote = useCallback((rate_obj) => {
    if (!quote.quote_number && all_rates.length) {
      if (quickQuoteEmail.initialLoad === true) {
        const quote_number = rate_obj.id
  
        const displayedPaymentOptions = () => {
          return [monthlyPaymentOption(rate_obj), payInFullOption(rate_obj)]
        }
        const paymentOptions = displayedPaymentOptions()
        const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
        const payment_plan_code = paymentOptions[planCodeIndex].plan_code
        const isLiveProd = window.location.origin === "https://auto-quote.insureonline.com"
        const isLiveProdAllowed = process.env.REACT_APP_LIVE_PROD_ALLOWED
        console.log("isLiveProdAllowed", isLiveProdAllowed);
        console.log("typeof isLiveProdAllowed", typeof(isLiveProdAllowed));
        const isQaAllowed = process.env.REACT_APP_QA_ALLOWED
        console.log("isQaAllowed", isQaAllowed);
        console.log("typeof isQaAllowed", typeof(isQaAllowed));
        const isDevAllowed = process.env.REACT_APP_DEV_ALLOWED
        console.log("isDevAllowed", isDevAllowed)
        console.log("typeof isDevAllowed", typeof(isDevAllowed));

        dispatch(updateQuote({ ...quote, payment_plan_code, quote_number })).finally(() => {
          if (isLiveProd && isLiveProdAllowed) {
            dispatch(sendQuoteByEmail(process.env.REACT_APP_AGENT_QUOTE_EMAIL))
          }
          if (!isLiveProd && (isQaAllowed || isDevAllowed)) {
            dispatch(sendQuoteByEmail(process.env.REACT_APP_DEV_QUOTE_EMAIL))
          }
          dispatch(setQuickQuoteInitialLoad(false))
        }) 
      }
    }
  }, [activeTab, all_rates, dispatch, quote, quickQuoteEmail.initialLoad])

  useEffect(() => {
    rate && mixpanel.track("Quick Quote Completed", {
      "Number Of Drivers": quote.drivers.length,
      "Number Of Vehicles": quote.vehicles.length,
      "Quote Number": rate.id,
      "Quoted Price": quote.pay_in_full ? priceDisplay(payInFullOption(rate)) : priceDisplay(monthlyPaymentOption(rate)),
    })

    rate && mixpanel.track("Pageview", {
      "Page Title": "Quick Quote Results",
      "Section": "Quick Quote"
    })

    rate && update_quote(rate)
  }, [rate, quote.drivers.length, quote.vehicles.length, quote.pay_in_full, update_quote, dispatch, quote.quote_number])

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
  const sortedVehicles = sortVehicles(rate.vehicles)

  return (
    <>
      <Container fluid className="container-rate-overview bg-light">
        <Helmet>
          <title>Quote overview | InsureOnline.com</title>
        </Helmet>
        <Container className="p-0 rater-navigation">
          <div className="d-flex">
            <Link className="rounded-pill btn btn-outline-dark" to={'/quotes/review'}>
              <BackIcon />
              {t("editQuote")}
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

        <Container className="p-0 py-lg-4 container-rate-overview__inner">
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
                   setShowOnlyEmailQuote ={setShowOnlyEmailQuote}
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
              <h5 className="mb-4 font-weight-bolder">{t("vehiclesInsuredByPolicy")}</h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap mb-5">
            { sortedVehicles.map((vehicle) => (
                <Col lg={6} key={vehicle.id} className="mb-4 d-flex">
                  <RateVehicle vehicle={vehicle} rate={rate}/>
                </Col>
              ))
            }
          </Row>

          <Row>
            <Col>
              <h5 className="mb-4 font-weight-bolder">{t("driversInsuredByPolicy")}</h5>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap">
            { quote.drivers.map((driver) => (
                <Col lg={6} key={driver.id} className="mb-4 d-flex">
                  <RateDriver driver={driver}/>
                </Col>
              ))
            }
          </Row>
        </Container>
      </Container>

      <Container fluid className="container-rate-details text-center pt-0">
        <Col lg={6} className="mx-auto">
          <p className="text-med-dark font-italic"><small>{t("footerDisclaimer")}</small></p>
        </Col>
      </Container>
      <TransitionModal show={submittedPurchasing} />
      <EmailQuoteModal show={showEmailQuoteModal} setShow={setShowEmailQuoteModal}/>
      <EmailQuoteOnly   show={showOnlyEmailQuote}  setShow={setShowOnlyEmailQuote}/>
    </>
  )
}

export default withTranslation(['quotes'])(Rate);
