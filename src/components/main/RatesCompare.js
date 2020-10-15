import React from 'react';
import { withTranslation } from 'react-i18next';
// import history from "../../history";
import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom'

function RatesCompare(props) {
  const { t } = props;
  let { rates } = props.data

  return (
    <Row>
      <Col lg={ {offset: 1, span: 5} }>
        <p className="text-med-dark mb-4">
          We’ve put together the the best quote possible based on the information you provided.
          We recommend First Chicago Insurance Company as your carrier!
        </p>
      </Col>
      <Col lg={ {span: 5} }>
        <h1>Hi</h1>
      </Col>
    </Row>
  )
}

export default withTranslation(['quotes'])(RatesCompare);
