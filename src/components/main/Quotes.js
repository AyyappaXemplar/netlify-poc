import React, { useState,
                useEffect } from 'react';
import { Row, Col }         from 'react-bootstrap';
import { withTranslation }  from 'react-i18next';
import { Link }             from 'react-router-dom'
import { useSelector } from 'react-redux'

import QuoteVehicles  from '../../containers/QuoteVehicles'
import QuoteDrivers   from '../../containers/QuoteDrivers'
import QuoteDiscounts from '../quote/Discounts'
import TitleRow       from '../shared/TitleRow'

import QuoteScreenStructure from '../../services/quote-screen-structure'


function Quote({ match, t }) {
  const RESOURCE_COMPONENTS = {
    drivers: QuoteDrivers,
    vehicles: QuoteVehicles,
    discounts: QuoteDiscounts
  }
  const quoteScreenStructure = QuoteScreenStructure

  const [resource, setResource] = useState('vehicles')
  useEffect(() => {
    window.scrollTo({ top: 0 })
    const resource = match.params.resource || 'fullQuote'
    setResource(resource)
  }, [match.params.resource])

  const quote = useSelector(state => state.data.quote)

  function quoteItems(param, location) {
    const resource = param || this.state.resource
    const screenStructure = quoteScreenStructure[resource]
    return screenStructure[`items${location}Button`].map(item => {
      let Component = RESOURCE_COMPONENTS[item]
      let showWarnings = location === "Before" ? screenStructure.showWarnings : false
      return <Component key={item} showWarnings={showWarnings}/>
    })
  }

  const pageResource = match.params.resource
  const link = quoteScreenStructure[resource].saveUrl(quote)
  const title = t(`${resource}.title`)
  const subtitle = t(`${resource}.subtitle`)
  const buttonText = t(`${resource}.saveButton`)


  return (
    <>
      <TitleRow title={title} subtitle={subtitle}/>
      <Row className="justify-content-center">
        <Col lg={6}>

          { quoteItems(pageResource, "Before") }

          <div className="w-50 mx-auto mb-5">
            <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={link}>{buttonText}</Link>
          </div>

          { quoteItems(pageResource, "After") }

        </Col>
      </Row>
    </>
  );

}

export default withTranslation(['quotes'])(Quote)
