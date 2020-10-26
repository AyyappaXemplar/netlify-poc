import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector }   from 'react-redux'
import { withTranslation }   from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col }          from 'react-bootstrap'

import history           from "../../history"
import RateDriver        from "../shared/RateDriver"
import RateVehicle       from "../shared/RateVehicle"
import PricingTabs       from '../shared/PricingTabs'
import SpinnerScreen     from "../shared/SpinnerScreen"
import image                          from '../../images/FCIC-Logo.png'
import { ReactComponent as StarIcon } from '../../images/star.svg'

import { updateVehicleCoverages,
         deleteVehicle }  from '../../actions/vehicles'
import { rateQuote,
         getAllCarriers } from '../../actions/rates'
import { deleteDriver }   from '../../actions/drivers'
import { setAlert }       from '../../actions/state'

export function useGetRatesAndCarriers() {
  const rates    = useSelector(state => state.data.rates)
  const carriers = useSelector(state => state.data.carriers)
  const dispatch = useDispatch()

  //load rates and carriers
  useEffect(() => {
    if (!rates.length) {
      dispatch(rateQuote())
    }
    if (!carriers.length) {
      dispatch(getAllCarriers())
    }
  }, [rates, carriers, dispatch])

  return [rates, carriers]
}

function Rate({ t, match }) {
  const quote     = useSelector(state => state.data.quote)
  const coverages = useSelector(state => state.data.coverages)
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
  }, [dispatch, rates, carriers, rateIndex])

  if (!rate || !carriers) {
    return (
      <SpinnerScreen title={t('submit.title')}/>
    )
  }

  return (
    <>
      { rates && rates.length > 1 &&
        <Row className="px-3 mb-5">
          <Col xs={12} sm={6} lg={3} className="text-center text-sm-left p-0">
            <Link className="rounded-pill btn btn-outline-dark  mt-3" to={'/quotes/review'}> &lt; Edit Quote </Link>
          </Col>
          <Col xs={{order: 3, span: 12 }} lg={{ order: 0, span: 6 }}>
          </Col>
          <Col xs={12} sm={6} lg={3} className="text-center text-sm-right p-0">
            <Link className="rounded-pill btn btn-outline-dark mt-3" to={'/rates/compare'}>See Other Options</Link>
          </Col>
        </Row>
      }
      <Row>
        <Col lg={ {offset: 1, span: 5} }>
          <h1 className="mb-5">{t('quotes:rate.title')}</h1>
          <p className="text-med-dark mb-4">
            We’ve put together the the best quote possible based on the information you provided.
            We recommend First Chicago Insurance Company as your carrier!
          </p>
          <div className="border p-3 mb-5">
            <div className="d-flex mb-3">
              <img style={{height: '65px'}}src={image} alt="carrier"/>
              <h4 className="px-4">First Chicago Insurance Company</h4>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <div className="text-warning d-inline-block mr-2 mb-1">
                {[1,2,3,4,5].map(number => <StarIcon key={number}/>)}
              </div>
              <span>9.5/10</span>
            </div>
            <p className="text-med-dark">
              Esse non commodo tempor veniam adipisicing exercitation adipisicing reprehenderit
              dolore dolor sunt duis esse minim cillum ut aute culpa nostrud velit tempor
              adipisicing id in quis dolore nisi pariatur in id proident qui sint excepteur dolor
              irure in ea amet irure aliqua est quis veniam laborum sit dolor dolore proident
              officia occaecat ut nostrud dolore commodo esse duis nostrud et commodo occaecat
              laborum reprehenderit excepteur ullamco ut amet ad do fugiat enim veniam dolore in
              sunt ullamco veniam ut anim consectetur laboris ut non est elit ad dolore nisi ut in.
            </p>
          </div>
        </Col>
        <Col lg={ {span: 5} }>
          { <PricingTabs quote={quote} rate={rate}/> }
        </Col>
      </Row>

      <Row>
        <Col lg={ {offset: 1, span: 5} }>
          <h5 className="mb-4 font-weight-bolder">Vehicles Insured by Policy</h5>
        </Col>
      </Row>
      <Row className="mb-5">
        { rate.vehicles.map((vehicle, index) => (
            <Col lg={ {offset: (index + 1) % 2, span: 5} } key={index} className="mb-4">
              <RateVehicle
                deleteVehicle={(vehicleId) => dispatch(deleteVehicle(vehicleId))}
                updateVehicleCoverages={(id, coveragePackage) => dispatch(updateVehicleCoverages(id, coveragePackage))}
                vehicle={vehicle} coverages={coverages}
              />
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
              <RateDriver deleteDriver={deleteDriver} driver={driver}/>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default withTranslation(['quotes'])(Rate);
