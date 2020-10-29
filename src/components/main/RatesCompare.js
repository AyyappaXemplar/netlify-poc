import React, { useState }     from 'react';
import { withTranslation }     from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import { Link }                from 'react-router-dom';
import { useSelector }         from 'react-redux';

import CoverageStrength from '../shared/CoverageStrength';
import CoveragePricing  from '../shared/CoveragePricing';
import SpinnerScreen         from '../shared/SpinnerScreen';
import CustomToggle          from '../shared/CustomToggle';

import { monthlyPaymentOption,
         priceDisplay,
         payInFullOption }       from '../../services/payment-options'
import { useGetRatesAndCarriers } from './Rate'

function RatesCompare({ t }) {
  const quote = useSelector(state => state.data.quote)
  const [annualRate, setMonthlyRate] = useState(quote.pay_in_full)
  const [rates, carriers] = useGetRatesAndCarriers()

  const monthlyPrice = (rate) => {
    const price = monthlyPaymentOption(rate)
    return priceDisplay(price)
  }

  const payInFullPrice = (rate) => {
    const price = payInFullOption(rate)
    return priceDisplay(price)
  }

  const getRate = (rate, index) => {
    let carrier = carriers.find(carrier => carrier.tag === rate.carrier_id)

    return (
      <Col xs={12} md={6} lg={4} className='mb-4 d-flex' key={index}>
        <div className='card rate-item-card carrier-card bg-white rounded'>
          <div className="card-body">
            <div className="carrier-image">
              <img src={`https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/carriers/logos/${carrier.tag.toLowerCase()}.png`} alt="carrier"/>
            </div>

            <h3 className='title'>{carrier.name}</h3>
            <h5 className='carrier-product'>{rate.carrier_product_id.replace(/_/g, " ")}</h5>

            <p className='text-med-dark mt-4'>
              {carrier.description}
            </p>
          </div>

          <div className="card-footer mt-4">
            <div className="d-flex align-items-end mb-3">
              <div className="d-flex price-container">
                <p className="price-container__price mb-0">
                  <sup className="price-container__dollar">$</sup>
                  { annualRate ? payInFullPrice(rate) : monthlyPrice(rate) }
                </p>
                <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> { annualRate ? 'term' : 'month' }</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="mb-3">
                <CoverageStrength strength='GOOD'/>
              </div>
              <CoveragePricing strength='GOOD'/>
            </div>

            <Link to={`/rates?index=${index}`} className="rounded-pill btn btn-primary btn-block btn-lg">
              Select Coverage
            </Link>
          </div>
        </div>
      </Col>
    )
  }

  if (!rates.length || !carriers.length) return <SpinnerScreen title={t('loading')}/>

  return (
    <Container>
      <Row>
        <Col md={8} lg={6} className="text-center mx-auto my-4">
          <h1>Select a Carrier</h1>
          <p>We offer policies from various carriers. If you’re not thrilled about our recommended carrier, you can choose one that better fits your needs.</p>
        </Col>
      </Row>

      <Row>
        <Col className='justify-content-center d-flex align-items-center'>
          <span className="color-med-dark mr-3">Monthly</span>
          <CustomToggle checked={annualRate} onChange={() => setMonthlyRate(!annualRate)}/>
          <span className="color-med-dark ml-3">Pay In Full</span>
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center d-flex flex-wrap">
        { rates.map((rate, index) => getRate(rate, index) )}
      </Row>
    </Container>
  )
}

export default withTranslation(['rates'])(RatesCompare);
