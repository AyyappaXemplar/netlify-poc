import React from 'react';
import { withTranslation } from 'react-i18next';
// import history from "../../history";
import TitleRow from "../shared/TitleRow";
import RatedQuoteDriver from "../shared/RatedQuoteDriver";
import RatedQuoteVehicle from "../shared/RatedQuoteVehicle";
import { Row, Col } from 'react-bootstrap';
import RatedQuote from '../../server/ratedQuote.js';

class QuotesRate extends React.Component {
  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { t, deleteDriver, deleteVehicle } = this.props;
    // let { quote } = this.props.data
    const quote  = RatedQuote
    const quoteVehicles = quote.vehicles.map((vehicle, index) => {
      let offset = (index + 1) % 2 ;

      return (
        <Col md={ {offset: offset, span: 5} } key={index}>
          <RatedQuoteVehicle deleteVehicle={deleteVehicle} vehicle={vehicle}/>
        </Col>
      )
    })

    const quoteDrivers = quote.drivers.map((driver, index) => {
      let offset = (index + 1) % 2 ;

      return (
        <Col md={ {offset: offset, span: 5} } key={index}>
          <RatedQuoteDriver deleteDriver={deleteDriver} driver={driver}/>
        </Col>
      )
    })

    return (
      <>
        <TitleRow colClassNames='text-center' title={t('quotes:rate.title')}/>
        <Row>
          <Col md={ {offset: 1, span: 5} }>
            <h5 className="mb-4 font-weight-bolder">Vehicles Insured by Policy</h5>
          </Col>
        </Row>
        <Row className="mb-5">
          { quoteVehicles }
        </Row>
        <Row>
          <Col md={ {offset: 1, span: 5} }>
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
