import React, { useState, useEffect }     from 'react';
import { withTranslation }     from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import { Link }                from 'react-router-dom';
import { useSelector, useDispatch }         from 'react-redux';
import CoverageStrength from '../shared/CoverageStrength';
import CoveragePricing  from '../shared/CoveragePricing';
import SpinnerScreen         from '../shared/SpinnerScreen';
import CustomToggle          from '../shared/CustomToggle';
import { monthlyPaymentOption,
         priceDisplay,
         payInFullOption }       from '../../services/payment-options'
import { useGetRatesAndCarriers } from './Rate'
import { averageCoverageStrength } from '../../services/rate-quality';
import mixpanel from "../../config/mixpanel"
import { updateQuote, sendQuoteByEmail } from "../../actions/quotes"

function RatesCompare({ match, t }) {
  const dispatch = useDispatch()

  useEffect(() => {
    mixpanel.track("Pageview", {
      "Page Title": "Compare Quotes",
      "Section": "Quick Quote"
    });
  }, [])

  const quote = useSelector(state => state.data.quote)
  const quoteId = match.params.quoteId
  const [annualRate, setMonthlyRate] = useState(quote.pay_in_full)
  const [rates, carriers] = useGetRatesAndCarriers()

  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'
  const defaultActiveKey  = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState(defaultActiveKey)

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
    let averageStrength = averageCoverageStrength(rate);

    const displayedPaymentOptions = () => {
      return [monthlyPaymentOption(rate), payInFullOption(rate)]
    }

    const updateQuoteNow = () => {
      const paymentOptions = displayedPaymentOptions()
      const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
      const payment_plan_code = paymentOptions[planCodeIndex].plan_code
      const quote_number = rate.id
      dispatch(updateQuote({...quote, payment_plan_code, quote_number})).finally(() => dispatch(sendQuoteByEmail("agent@insureonline.com")))
    }

    return (
      <Col xs={12} md={6} lg={4} className='mb-4 d-flex' key={index}>
        <div className='card rate-item-card carrier-card bg-white rounded'>
          <div className="card-body">
            {index === 0 &&
              <div className="recommended">
                <span>{t("recommendedForYou")}</span>
              </div>
            }
            <div className="carrier-image">
              <img src={`https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/carriers/logos/${carrier.tag.toLowerCase()}.png`} alt="carrier"/>
            </div>

            <h3 className='title'>{carrier.name}</h3>

            <p className='text-med-dark mt-4'>
              {t(`carrierDescriptions.${carrier.tag}`)}
            </p>
          </div>

          <div className="card-footer mt-4">
            <div className="d-flex align-items-end mb-3">
              <div className="d-flex price-container">
                <p className="price-container__price mb-0">
                  <sup className="price-container__dollar">$</sup>
                  { annualRate ? payInFullPrice(rate) : monthlyPrice(rate) }
                </p>
                <span className="price-container__text align-self-end text-med-dark ml-1">{t("per")}<br/> { annualRate ? t("term") : t("month") }</span>
              </div>
            </div>
 
            <div className="mb-5">
              <div className="mb-3">
                <CoverageStrength strength={averageStrength}/>
              </div>
              <CoveragePricing strength={averageStrength}/>
            </div>

            <Link onClick={() => updateQuoteNow()} to={`/quotes/${quoteId}/rates/?index=${index}`} className="rounded-pill btn btn-primary btn-block btn-lg">
              {t("selectCoverage")}
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
          <h1>{t("selectACarrier")}</h1>
          <p>{t("weOfferPoliciesFromVariousCarriers")}</p>
        </Col>
      </Row>

      <Row>
        <Col className='justify-content-center d-flex align-items-center'>
          <span className="color-med-dark mr-3">{t("monthly")}</span>
          <CustomToggle checked={annualRate} onChange={() => setMonthlyRate(!annualRate)}/>
          <span className="color-med-dark ml-3">{t("payInFull")}</span>
        </Col>
      </Row>

      <Row className="mt-5 pt-5 justify-content-center d-flex flex-wrap">
        { rates.map((rate, index) => getRate(rate, index) )}
      </Row>
    </Container>
  )
}

export default withTranslation(['rates'])(RatesCompare);
