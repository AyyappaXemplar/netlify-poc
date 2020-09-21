import React from 'react';
import { withTranslation } from 'react-i18next';
// import history from "../../history";
import TitleRow from "../shared/TitleRow";
import RatedQuoteDriver from "../shared/RatedQuoteDriver";
import { Row, Col } from 'react-bootstrap'

class QuotesRate extends React.Component {
//   constructor(props) {
//     super(props)
//   }

  // componentDidMount() {
  // }

//   componentDidUpdate(prevProps, prevState) {
//     const prevRating = prevProps.state.ratingQuote
//     const { ratingQuote: rating } = this.props.state
//
//     const isRatingQuote = !prevRating && rating
//     const ratedQuote = prevRating && !rating
//
//     if (isRatingQuote) {
//       this.setState({ showSpinner: true})
//     }
//
//     if (ratedQuote) {
//       this.setState({ showSpinner: false}, () => {
//         history.push('/quotes/rated')
//       })
//     }
//   }

  render() {
    const { t, deleteDriver } = this.props;
    // let { quote } = this.props.data
    const quote  = { drivers: [{
      "id": "qd_12345",
      "object": "quote_driver",
      "quote": "quote_123456789",
      "created_at": 1594718279,
      "updated_at": 1594718279,
      "policyholder": true,
      "first_name": "John",
      "last_name": "Test",
      "other_name": null,
      "address": {
        "line1": "123 Main St.",
        "line2": null,
        "city": "Chicago",
        "state": "IL",
        "zip_code": "60622"
      },
      "email": "john.test@example.com",
      "phone": null,
      "mobile": "3128831882",
      "gender": "male",
      "birthday": "1990-09-13",
      "marital_status": "married",
      "license_type": "driver",
      "license_status": "active",
      "license_issued_at": 301830403,
      "license_state": "IL",
      "good_driver": true,
      "good_student": false,
      "defensive_driver": false,
      "requires_sr22": false,
      "occupation": null,
      "international_license": false
    },
    {
      "id": "qd_12345",
      "object": "quote_driver",
      "quote": "quote_123456790",
      "created_at": 1594718279,
      "updated_at": 1594718279,
      "policyholder": true,
      "first_name": "Jane",
      "last_name": "Doe",
      "other_name": null,
      "address": {
        "line1": "123 Main St.",
        "line2": null,
        "city": "Chicago",
        "state": "IL",
        "zip_code": "60622"
      },
      "email": "john.test@example.com",
      "phone": null,
      "mobile": "3128831882",
      "gender": "female",
      "birthday": "1990-09-13",
      "marital_status": "single",
      "license_type": "driver",
      "license_status": "active",
      "license_issued_at": 301830403,
      "license_state": "IL",
      "good_driver": true,
      "good_student": false,
      "defensive_driver": false,
      "requires_sr22": false,
      "occupation": null,
      "international_license": false
    }] }

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
          { quoteDrivers }
        </Row>
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuotesRate);
