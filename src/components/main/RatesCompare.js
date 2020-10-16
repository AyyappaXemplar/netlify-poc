import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import QuoteCoverageStrength from '../shared/QuoteCoverageStrength';
import QuoteCoveragePricing from '../shared/QuoteCoveragePricing';
import { Link } from 'react-router-dom';
import { monthlyPaymentOption, priceDisplay, payInFullOption } from '../../services/payment-options'

function RatesCompare({ t }) {
  const [payInFull, setPayInFull] = useState(true)

  const rates = useSelector(state => state.data.rates)

  return (
    <Row>
      <Col xs={12} lg={{offset: 2, span: 8}}>
        <Row className="mt-5 justify-content-center">
          { rates.map((rate, index) =>

            <Col xs={12} md={6} className='mb-4' key={index}>
              <div className="bg-white rounded px-4 py-5">
                <h3>Rater Company {index}</h3>
                <p className='text-med-dark'>
                  Rater company {index} text adipisicing exercitation adipisicing reprehenderit
                  dolore dolor sunt duis esse minim cillum ut aute culpa nostrud velit tempor
                  adipisicing
                </p>
                <div className="d-flex align-items-end mb-5">
                  <div className="d-flex price-container">
                    <p className="price-container__price mb-0">
                      <sup className="price-container__dollar">$</sup>
                      {priceDisplay(monthlyPaymentOption(rate))}
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
  )
}

export default withTranslation(['quotes'])(RatesCompare);
