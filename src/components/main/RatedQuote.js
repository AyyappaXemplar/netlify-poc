import React from 'react';
import { withTranslation } from 'react-i18next';
// import history from "../../history";
import RatedQuoteDriver from "../shared/RatedQuoteDriver";
import RatedQuoteVehicle from "../shared/RatedQuoteVehicle";
import { Row, Col } from 'react-bootstrap';
import RatedQuote from '../../server/ratedQuote.js';
import PricingTabs from '../shared/PricingTabs';

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

    return (
      <>
        <Row>
          <Col lg={ {offset: 1, span: 5} }>
            <h1>{t('quotes:rate.title')}</h1>
          </Col>
          <Col lg={ {span: 5} }>
            <PricingTabs quote={quote}/>
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
