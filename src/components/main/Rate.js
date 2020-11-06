import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector }   from 'react-redux'
import { withTranslation }     from 'react-i18next'
import { useLocation, Link }   from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import history           from "../../history"

import Carrier           from "../rate/Carrier"
import RateDriver        from "../rate/Driver"
import RateVehicle       from "../rate/Vehicle"
import PricingTabs       from '../rate/PricingTabs'
import SpinnerScreen     from "../shared/SpinnerScreen"

import { rateQuote,
         getAllCarriers } from '../../actions/rates'
import { setAlert }       from '../../actions/state'
import { ReactComponent as BackIcon } from '../../images/chevron-left.svg';

import "./rate.scss"

export function useGetRatesAndCarriers() {
  const rates                  = useSelector(state => state.data.rates)
  const carriers               = useSelector(state => state.data.carriers)
  const ratingQuote            = useSelector(state => state.state.ratingQuote)
  const gettingCarriersInfo    = useSelector(state => state.state.gettingCarriersInfo)
  const dispatch = useDispatch()

  //load rates and carriers
  useEffect(() => {
    if (!ratingQuote && !rates.length) {
      dispatch(rateQuote())
    }
    if (!gettingCarriersInfo && !carriers.length) {
      dispatch(getAllCarriers())
    }
  }, [rates, carriers, ratingQuote, gettingCarriersInfo, dispatch])

  return [rates, carriers]
}

function useRate(rates) {
  const useQuery  = () => new URLSearchParams(useLocation().search)
  const rateIndex = useQuery().get('index') || 0
  const dispatch  = useDispatch()

  const [rate, setRate] = useState(undefined)
  useEffect(() => {
    if (rates.error) {
      const alert = {variant: 'danger', text:  'There was an error submitting your quote'}
      dispatch(setAlert(alert))
      history.push('/quotes/review')
    } else {
      setRate(rates[rateIndex])
    }
  }, [dispatch, rates, rateIndex])

  return rate
}

function useCarrier(rate, carriers) {
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
  const quote                    = useSelector(state => state.data.quote)
  const updatingVehicleCoverage  = useSelector(state => state.state.updatingVehicleCoverage)
  const [rates, carriers] = useGetRatesAndCarriers()

  const rate    = useRate(rates)
  const carrier = useCarrier(rate, carriers)

  if (!updatingVehicleCoverage && (!rate || !carrier)) return <SpinnerScreen title={t('submit.title')}/>

  return (
    <>
      <Container fluid className="container-rate-overview bg-light">

        <Container className="rater-navigation">
          <div className="d-flex">
            <Link className="rounded-pill btn btn-outline-dark" to={'/quotes/review'}>
              <BackIcon />
              Edit Quote
            </Link>

            { rates && rates.length > 1 &&
              <Link
                className="rounded-pill btn btn-outline-secondary ml-auto"
                to={'/rates/compare'}
              >
                {t('quotes:rate.otherRates')}
              </Link>
            }
          </div>
        </Container>

        <Container className="py-4 container-rate-overview__inner">
          <Row>
            <Col lg={6}>
              <h1 className="h1-lg mb-2">{t('quotes:rate.title')}</h1>
              <p className="text-med-dark mb-4">
                We’ve put together the the best quote possible based on the information you provided.
                We recommend {carrier.name} as your carrier!
              </p>
              <Carrier carrier={carrier}/>
            </Col>
            <Col lg={6}>
              { <PricingTabs quote={quote} rate={rate}/> }
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="container-rate-details">
        <Container className="container-rate-details__inner">
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
    </>
  )
}

export default withTranslation(['quotes'])(Rate);
