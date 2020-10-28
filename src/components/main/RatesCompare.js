import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col }    from 'react-bootstrap';
import { Link }        from 'react-router-dom';
import { useSelector } from 'react-redux';

import QuoteCoverageStrength from '../shared/QuoteCoverageStrength';
import QuoteCoveragePricing  from '../shared/QuoteCoveragePricing';
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
      <Col xs={12} md={6} className='mb-4' key={index}>
        <div className='rate-item-card bg-white rounded px-4 py-5'>
          <h3 className='title'>{carrier.name}</h3>
          <p className='text-med-dark'>
            {carrier.description}
          </p>
          <div className="d-flex align-items-end mb-5">
            <div className="d-flex price-container">
              <p className="price-container__price mb-0">
                <sup className="price-container__dollar">$</sup>
                { annualRate ? payInFullPrice(rate) : monthlyPrice(rate) }
              </p>
              <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> { annualRate ? 'year' : 'month' }</span>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-3">
              <QuoteCoverageStrength strength='GOOD'/>
            </div>
            <QuoteCoveragePricing strength='GOOD'/>
          </div>
          <div className="w-75 mx-auto">
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
    <>
      <Row>
        <Col className='justify-content-center d-flex align-items-center'>
          <span className="color-med-dark mr-3">Monthly</span>
          <CustomToggle checked={annualRate} onChange={() => setMonthlyRate(!annualRate)}/>
          <span className="color-med-dark ml-3">Pay In Full</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={{offset: 2, span: 8}}>
          <Row className="mt-5 justify-content-center">
            { rates.map((rate, index) => getRate(rate, index) )}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default withTranslation(['rates'])(RatesCompare);
