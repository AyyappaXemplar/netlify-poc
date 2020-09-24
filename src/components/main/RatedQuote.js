import React from 'react';
import { withTranslation } from 'react-i18next';
// import history from "../../history";
import TitleRow from "../shared/TitleRow";
import RatedQuoteDriver from "../shared/RatedQuoteDriver";
import RatedQuoteVehicle from "../shared/RatedQuoteVehicle";
import { Row, Col, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RatedQuote from '../../server/ratedQuote.js';
import QuoteCoverageStrength from '../shared/QuoteCoverageStrength';

class QuotesRate extends React.Component {
  render() {
    const { t, deleteDriver, deleteVehicle } = this.props;
    // let { quote } = this.props.data
    const quote  = RatedQuote
    const quoteVehicles = quote.vehicles.map((vehicle, index) => {
      let offset = (index + 1) % 2 ;

      return (
        <Col lg={ {offset: offset, span: 5} } key={index} className="mb-4">
          <RatedQuoteVehicle deleteVehicle={deleteVehicle} vehicle={vehicle}/>
        </Col>
      )
    })

    const quoteDrivers = quote.drivers.map((driver, index) => {
      let offset = (index + 1) % 2 ;

      return (
        <Col lg={ {offset: offset, span: 5} } key={index} className="mb-4">
          <RatedQuoteDriver deleteDriver={deleteDriver} driver={driver}/>
        </Col>
      )
    })

    const priceTabs = quote.rate.payment_options.map((option, index) => {
      let price = option.policy_premium
      let title = <div className="text-center p-2">{option.plan_description}</div>

      return (
        <Tab eventKey={option.plan_description} key={option.plan_description} title={title}>
          <div className="rated-quote-item-card p-5">
            <div className="title mb-3">Quote #{quote.id}</div>
            <div className="d-flex price-container mb-5">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> month</span>
            </div>
            <QuoteCoverageStrength strength={1}/>
            <div className="mx-auto mb-5">
              <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={'/#'}>Buy Online</Link>
            </div>
          </div>
        </Tab>
      )
    })

    return (
      <>
        <Row>
          <Col lg={ {offset: 1, span: 5} }>
            <h1>{t('quotes:rate.title')}</h1>
          </Col>
          <Col lg={ {span: 5} }>
            <div className='bg-white shadow-sm'>
              <Tabs defaultActiveKey={quote.rate.payment_options[0].plan_description}>
                { priceTabs }
              </Tabs>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={ {offset: 1, span: 5} }>
            <h5 className="mb-4 font-weight-bolder">Vehicles Insured by Policy</h5>
          </Col>
        </Row>
        <Row className="mb-5">
          { quoteVehicles }
        </Row>
        <Row>
          <Col lg={ {offset: 1, span: 5} }>
            <h5 className="mb-4 font-weight-bolder">Vehicles Insured by Policy</h5>
          </Col>
        </Row>
        <Row>
          { quoteDrivers }
        </Row>
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuotesRate);
