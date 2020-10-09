import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import QuoteVehicles from '../../containers/QuoteVehicles'
import QuoteDrivers from '../../containers/QuoteDrivers'
import QuoteDiscounts from '../../containers/QuoteDiscounts'
import QuoteScreenStructure from '../../constants/quote-screen-structure'
import TitleRow from '../shared/TitleRow'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Quote({ match, t }) {
  const RESOURCE_COMPONENTS = {
    drivers: QuoteDrivers,
    vehicles: QuoteVehicles,
    discounts: QuoteDiscounts
  }
  const quoteScreenStructure = QuoteScreenStructure


  const [resource, setResource] = useState('vehicles')

  useEffect(() => {
    const resource = match.params.resource || 'fullQuote'
    setResource(resource)
  }, [resource])

  function itemsBeforeButton(param) {
    const screenStructure = quoteScreenStructure[resource]
    return screenStructure.itemsBeforeButton.map(item => {
      const Component = RESOURCE_COMPONENTS[item]
      return <Component key={item} showWarnings={screenStructure.showWarnings}/>
    })
  }

  function itemsAfterButton(param) {
    const resource = param || this.state.resource
    const screenStructure = quoteScreenStructure[resource]
    return screenStructure.itemsAfterButton.map(item => {
      const Component = RESOURCE_COMPONENTS[item]
      return <Component key={item} disabled={true}/>
    })
  }

  window.scrollTo({ top: 0 });
  const pageResource = match.params.resource
  const link = quoteScreenStructure[resource].saveUrl
  const title = t(`${resource}.title`)
  const subtitle = t(`${resource}.subtitle`)
  const buttonText = t(`${resource}.saveButton`)


  return (
    <>
      <TitleRow title={title} subtitle={subtitle}/>
      <Row className="justify-content-center">
        <Col lg={6}>

          { itemsBeforeButton(pageResource) }

          <div className="w-50 mx-auto mb-5">
            <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={link}>{buttonText}</Link>
          </div>

          { itemsAfterButton(pageResource) }

        </Col>
      </Row>
    </>
  );

}

export default withTranslation(['quotes'])(Quote)
