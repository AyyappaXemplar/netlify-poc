import React, { useState, useEffect } from 'react';
import { withTranslation }            from 'react-i18next';
import { useSelector, useDispatch }   from 'react-redux';
import { Row, Col }    from 'react-bootstrap';
import { Link }        from 'react-router-dom';

import QuoteCoverageStrength from '../shared/QuoteCoverageStrength';
import QuoteCoveragePricing  from '../shared/QuoteCoveragePricing';
import SpinnerScreen         from '../shared/SpinnerScreen';
import CustomToggle          from '../shared/CustomToggle';

import { monthlyPaymentOption,
         priceDisplay,
         payInFullOption } from '../../services/payment-options'
import { rateQuote }       from '../../actions/quotes'
import 'react-toggle/style.css';

function RatesCompare({ t }) {
  const rates = useSelector(state => state.data.rates)
  const dispatch = useDispatch()
  const [annualRate, setMonthlyRate] = useState(false)

  //load rates
  useEffect(() => {
    if (!rates.length) {
      dispatch(rateQuote())
    }
  }, [rates, dispatch, rateQuote])


  const monthlyPrice = (rate) => {
    const price = monthlyPaymentOption(rate)
    return priceDisplay(price)
  }

  const payInFullPrice = (rate) => {
    const price = payInFullOption(rate)
    return priceDisplay(price)
  }

  if (!rates.length) return <SpinnerScreen title={t('loading')}/>

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
            { rates.map((rate, index) =>

              <Col xs={12} md={6} className='mb-4' key={index}>
                <div className='rate-item-card bg-white rounded px-4 py-5'>
                  <h3 className='title'>Rater Company {index}</h3>
                  <p className='text-med-dark'>
                    Rater company {index} text adipisicing exercitation adipisicing reprehenderit
                    dolore dolor sunt duis esse minim cillum ut aute culpa nostrud velit tempor
                    adipisicing
                  </p>
                  <div className="d-flex align-items-end mb-5">
                    <div className="d-flex price-container">
                      <p className="price-container__price mb-0">
                        <sup className="price-container__dollar">$</sup>
                        { annualRate ? payInFullPrice(rate) : monthlyPrice(rate) }
                      </p>
                      <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> month</span>
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
            )}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default withTranslation(['rates'])(RatesCompare);
