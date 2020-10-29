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
  const ratingQuote            = useSelector(state => state.state.ratingQuote)
  const gettingCarriersInfo    = useSelector(state => state.state.gettingCarriersInfo)
  const carriers               = useSelector(state => state.data.carriers)
  const dispatch = useDispatch()

  //load rates and carriers
  useEffect(() => {
    if (!ratingQuote && !rates.length) {
      dispatch(rateQuote())
    }
    if (!gettingCarriersInfo && !carriers.length) {
      dispatch(getAllCarriers())
    }
  }, [rates, carriers, ratingQuote, dispatch, gettingCarriersInfo])

  return [rates, carriers]
}

function Rate({ t, match }) {
  const quote     = useSelector(state => state.data.quote)
  const dispatch  = useDispatch()
  const useQuery  = () => new URLSearchParams(useLocation().search)
  const rateIndex = useQuery().get('index') || 0
  const [rates, carriers] = useGetRatesAndCarriers()

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

  const [carrier, setCarrier] = useState(undefined)
  useEffect(() => {
    if (rate && carriers.length) {
      setCarrier(carriers.find(carrier => carrier.tag === rate.carrier_id))
    }
  }, [rate, carriers])

  if (!rate || !carriers || !carrier) {
    return (
      <SpinnerScreen title={t('submit.title')}/>
    )
  }

  return (
    <>
      <Container fluid className="container-rate-overview bg-light">

        <Container className="rater-navigation">
          <Row>
            <Link className="rounded-pill btn btn-outline-dark" to={'/quotes/review'}>
              <BackIcon />
              Edit Quote
            </Link>

            { rates && rates.length > 1 &&
              <Link className="rounded-pill btn btn-outline-dark ml-auto" to={'/rates/compare'}>See Other Options</Link>
            }
          </Row>
        </Container>

        <Container className="py-4">
          <Row>
            <Col lg={ {offset: 1, span: 5} }>
              <h1 className="h1-lg mb-2">{t('quotes:rate.title')}</h1>
              <p className="text-med-dark mb-4">
                We’ve put together the the best quote possible based on the information you provided.
                We recommend {carrier.name} as your carrier!
              </p>
              <Carrier carrier={carrier}/>
            </Col>
            <Col lg={ {span: 5} }>
              { <PricingTabs quote={quote} rate={rate}/> }
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="container-rate-details">
        <Container>
          <Row>
            <Col lg={ {offset: 1, span: 5} }>
              <h5 className="mb-4 font-weight-bolder">Vehicles Insured by Policy</h5>
            </Col>
          </Row>
          <Row className="mb-5">
            { rate.vehicles.map((vehicle, index) => (
                <Col lg={ {offset: (index + 1) % 2, span: 5} } key={index} className="mb-4">
                  <RateVehicle vehicle={vehicle} />
                </Col>
              ))
            }
          </Row>
          <Row>
            <Col lg={ {offset: 1, span: 5} }>
              <h5 className="mb-4 font-weight-bolder">Drivers Insured by Policy</h5>
            </Col>
          </Row>
          <Row>
            { quote.drivers.map((driver, index) => (
                <Col lg={ {offset: (index + 1) % 2, span: 5} } key={index} className="mb-4">
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
