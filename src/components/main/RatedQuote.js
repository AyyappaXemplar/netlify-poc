import React from 'react';
import { withTranslation } from 'react-i18next';
// import history from "../../history";
import RatedQuoteDriver from "../shared/RatedQuoteDriver";
import RatedQuoteVehicle from "../shared/RatedQuoteVehicle";
import { Row, Col } from 'react-bootstrap';
import RatedQuote from '../../server/ratedQuote.js';
import PricingTabs from '../shared/PricingTabs';
import image from '../../images/FCIC-Logo.png'

class QuotesRate extends React.Component {
  render() {
    const { t, deleteDriver, deleteVehicle, updateVehicleCoverages } = this.props;
    // let { quote } = this.props.data
    const quote  = RatedQuote
    const quoteVehicles = quote.vehicles.map((vehicle, index) => {
      let offset = (index + 1) % 2 ;

      return (
        <Col lg={ {offset: offset, span: 5} } key={index} className="mb-4">
          <RatedQuoteVehicle
            deleteVehicle={deleteVehicle}
            updateVehicleCoverages={updateVehicleCoverages}
            vehicle={vehicle}/>
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
                  {[1,2,3,4,5].map(number => (
                    <svg key={number} fill="currentColor" width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
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
