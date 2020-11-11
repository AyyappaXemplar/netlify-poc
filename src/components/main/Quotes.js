import React, { useState,
                useEffect } from 'react';
import { Container, Row, Col }         from 'react-bootstrap';
import { withTranslation }  from 'react-i18next';
import { Link }             from 'react-router-dom'
import { useSelector } from 'react-redux'

import QuoteVehicles   from '../../containers/QuoteVehicles'
import QuoteDrivers    from '../../containers/QuoteDrivers'
import QuoteDiscounts  from '../quote/Discounts'
import TitleRow        from '../shared/TitleRow'
import StartOverButton from '../shared/StartOverButton'
import FormAlert       from '../shared/FormAlert'

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
    window.scrollTo({ top: 0, behavior: "smooth" })
    const resource = match.params.resource || 'fullQuote'
    setResource(resource)
  }, [match.params.resource])

  const quote = useSelector(state => state.data.quote)
  const rates = useSelector(state => state.data.rates)

  function quoteItems(param, location) {
    const resource = param || this.state.resource
    const screenStructure = quoteScreenStructure[resource]
    return screenStructure[`items${location}Button`].map(item => {
      let Component = RESOURCE_COMPONENTS[item]
      let showWarnings = location === "Before" ? screenStructure.showWarnings : false
      return <Component key={item} showWarnings={showWarnings}/>
    })
  }

  // Display any errors from the rater
  // Sometimes the errors are duplicate, so we'll
  // check to see if we've already added the
  // error and ignore dups from the display
  function displayErrors() {
    if (!rates.errors) return false

    const errorMessages = new Set(); // Set has only unique values
    rates.errors.forEach(error => errorMessages.add(error.message) ) // values won't be repeated
    return [...errorMessages].map((message, index) => <FormAlert text={message} key={`rate-error-${index}`} />)
    // [...errorMessages] converts the set in an array
  }

  const pageResource = match.params.resource
  const link = quoteScreenStructure[resource].saveUrl(quote)
  const title = t(`${resource}.title`)
  const subtitle = t(`${resource}.subtitle`)
  const buttonText = t(`${resource}.saveButton`)

  return (
    <Container className="pt-base">
      <TitleRow title={title} subtitle={subtitle}/>

      <Row className="justify-content-center">
        <Col lg={6}>
          { displayErrors() }

          { quoteItems(pageResource, "Before") }

          <div className="w-100 w-sm-50 mx-auto my-4 my-sm-5">
            <Link className="rounded-pill btn btn-primary btn-block btn-lg mb-3" to={link}>{buttonText}</Link>
            <StartOverButton/>
          </div>

          { quoteItems(pageResource, "After") }
        </Col>
      </Row>
    </Container>
  );

}

export default withTranslation(['quotes'])(Quote)
