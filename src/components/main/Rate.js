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

import {
  getAllCarriers,
  rateQuote
}                        from '../../actions/rates'
import { 
  getQuote,
  updateQuote, 
  sendQuoteByEmail,
  setQuickQuoteInitialLoad
} from '../../actions/quotes'
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

export function sortVehicles(vehicles) {
  vehicles.sort(function(veh1, veh2) {
    return new Date(veh1.created_at) - new Date(veh2.created_at)
  })
  return vehicles
}

function Rate({ t, match }) {
  const quickQuoteEmail = useSelector(state => state.data.quickQuoteEmail)
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
  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'
  const defaultActiveKey  = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  const all_rates = useSelector(state => state.data.rates)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [selectedVeh, setSelectedVeh] = useState(null)
  const dispatch  = useDispatch()

  const initial_quote_update = useCallback((rate_obj) => {
    console.log("FIRE")
      const quote_number = rate_obj.id
  
      const displayedPaymentOptions = () => {
        return [monthlyPaymentOption(rate_obj), payInFullOption(rate_obj)]
      }
      const paymentOptions = displayedPaymentOptions()
      const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
      const payment_plan_code = paymentOptions[planCodeIndex].plan_code
      const isQa = window.location.href.includes("qa")
      
      dispatch(updateQuote({ ...quote, payment_plan_code, quote_number })).finally(() => {
        (process.env.NODE_ENV !== "development" && !isQa) ? dispatch(sendQuoteByEmail("agent@insureonline.com")) : dispatch(sendQuoteByEmail("jguzman@priscorp.net"))
        dispatch(setQuickQuoteInitialLoad(false))
      }) 
    }, [activeTab, dispatch, quote])

  const on_change_quote_update = useCallback(() => {
    const displayedPaymentOptions = () => {
        return [monthlyPaymentOption(rate), payInFullOption(rate)]
      }
    
    const paymentOptions = displayedPaymentOptions()
    const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
    const payment_plan_code = paymentOptions[planCodeIndex].plan_code
    const quote_number = rate.id
    const isQa = window.location.href.includes("qa")
    
    console.log("Not Initial Render")
    
    dispatch(updateQuote({ ...quote, payment_plan_code, quote_number })).finally(() => {
      (process.env.NODE_ENV !== "development" && !isQa) ? dispatch(sendQuoteByEmail("agent@insureonline.com")) : dispatch(sendQuoteByEmail("jguzman@priscorp.net"))
    }) 
  }, [activeTab, dispatch, quote, rate])

  // const selectedVeh = useCallback((selected) => {
  //   quote.vehicles.map(veh => veh.coverage_package_name !== selected.coverage_package_name && initial_quote_update(rate))
  // }, [initial_quote_update, quote.vehicles, rate])

  const setQQEmailStat = useCallback(() => {
    dispatch(setQuickQuoteInitialLoad(false))
  }, [dispatch])

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

    (!!rate && quickQuoteEmail.initialLoad === true) && (() => {
      // if (quickQuoteEmail.initialLoad !== false) {
        initial_quote_update(rate)
      // } else if (quickQuoteEmail.initialLoad === false) {
      //   if (rate.id !== quote.quote_number) {
      //     console.log("NEW CARRIER UPD")
      //     // initial_quote_update(rate)  
      //   }
      // }

      // if (isInitialLoad) {
      //   initial_quote_update(rate)
      // } 
      // else if (isInitialLoad && (rate.id !== quote.quote_number)) {
      //   initial_quote_update(rate)
      // } else if (selectedVeh) {
      //   quote.vehicles.forEach(qVeh => {
      //     if (qVeh.id === selectedVeh.id) {
      //       if (qVeh.coverage_package_name === selectedVeh.coverage_package_name) {
      //         initial_quote_update(rate)
      //       }
      //     }
      //   })
      // }
    })() 

    // !!rate && (() => {
    // })()
  }, [quickQuoteEmail, setQQEmailStat, rate, quote.drivers.length, quote.vehicles.length, quote.pay_in_full, dispatch, selectedVeh, quote.quote_number, initial_quote_update, quote.vehicles, all_rates, activeTab, MONTHLY_PAY_LABEL, isInitialLoad, on_change_quote_update])

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
                  <RateVehicle vehicle={vehicle} rate={rate} setSelectedVeh={setSelectedVeh}/>
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
    </>
  )
}

export default withTranslation(['quotes'])(Rate);
