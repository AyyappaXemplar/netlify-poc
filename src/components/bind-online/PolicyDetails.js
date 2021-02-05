import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { withTranslation }            from 'react-i18next'
import { Container, Form, Button,
         Row, Col }                   from 'react-bootstrap'

import Radio         from '../forms/Radio';
import FormContainer from '../shared/FormContainer';
import CustomSelect  from '../forms/CustomSelect';

import history from '../../history'
import { updatePolicyDetails } from '../../actions/bol'
import getDate, { getTimestamp, createDate, policyExpiry } from '../../services/timestamps'

function initQuote(state) {
  const defaultTerm = { duration: '', effective: '', expires: '' }

  const { quote } = state.data
  const { drivers=[], term=defaultTerm } = quote
  return { drivers, term }
}

function initDriver(quote) {
  const driver = quote.drivers.find(driver => driver.policyholder)
  let { id, address, policyholder, email, phone, first_name, middle_initial, last_name,
        communication_preference='neither' } = driver

  return { id, address, policyholder, email, phone, first_name, middle_initial, last_name,
           communication_preference }
}

function PolicyDetails({ t, match }) {
  const quote     = useSelector(initQuote)
  const bolStatus = useSelector(state => state.bol.status)

  const [driver, setDriver]         = useState(() => initDriver(quote))
  const [term, setTerm]             = useState(quote.term)

  // TODO: remane these state. It belongs to the driver, not the quote.
  const [quoteObj, setQuoteObj]     = useState({ communication_preference: driver.communication_preference })
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()

  const [displayDateSelect, setDisplayDateSelect] = useState(false)

  // TODO: we might not need to keep the state in sync with redux when we move to the URL workflow
  // useEffect(() => { setDriver(initDriver(quote)) }, [quote])

  useEffect(() => {
    if (!match) return

    if (bolStatus === 'Updating policy details') {
      setSubmitting(true)
    } else if (submitting && !bolStatus) {
      history.push('/bol/drivers/edit')
    }

  }, [bolStatus, match, submitting])

  const setTermObj = (value, prop) => {
    setTerm(prevTerm => {
      const newTerm = {...prevTerm}
      newTerm[prop] = value

      return newTerm
    })
  }

  const setDriverObj = (event) => {
    event.persist()
    const prop = event.target.name

    setDriver(prev => ({...prev, [prop]: event.target.value }))
  }

  const setDriverAddress = (event) => {
    event.persist()
    const prop = event.target.name

    setDriver(prev => {
      const newAddress = driver.address

      newAddress[prop] = event.target.value
      return {...prev, address: newAddress}
    })
  }

  const setDriverAddressState = (values) => {
    const value = values[0].value
    setDriver(prev => {
      const newAddress = driver.address

      newAddress.state = value
      return {...prev, address: newAddress}
    })
  }

  const changeCommunicationPreference = value => {
    setQuoteObj({ communication_preference: value })
  }

  const policyTermValues = [
    { value: 6,  label: '6 Months' },
    { value: 12, label: '12 Months' }
  ]

  const policyStartValues = [
    { value: 'tomorrow', label: 'Immediately (Next day)'},
    { value: 'next month', label: 'First of next month' },
    { value: 'custom', label: 'Custom date' }
  ]

  const communicationPreferencesOptions = [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'text' },
    { label: 'Either email or phone', value: 'both' }
  ]

  const contactInformationOptions = [
    { label: 'Email',      name: 'email', type: 'email' },
    { label: 'Cell Phone', name: 'phone', type: 'phone' }
  ]

  const policyHolderNameOptions = [
    { placeholder: 'First Name', name: 'first_name' },
    // { placeholder: 'MI',         name: 'middle_initial' },
    { placeholder: 'Last Name',  name: 'last_name' }
  ]

  function marginClass(length, index) {
    return (index === length - 1) ? '' : 'mr-2'
  }

  let stateOptions = require('../../data/US-state-options')
  stateOptions = stateOptions.map(item => ({...item, label: item.value}))

  const handleSubmit = (event) => {
    event.preventDefault()

    const residence_info = {
      "current_residence_date": 1596153600,
      "ownership": "rented",
      "type": "apartment",
      "months_at_current_address": 16
    }

    const quoteParams = { term, id: quote.id, residence_info }
    const driverParams = { ...driver, ...quoteObj}
    dispatch(updatePolicyDetails(quoteParams, driver.id, driverParams))
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
        <h2 className="mb-5 font-weight-bold ">Policy Details</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Label>How long of a policy do you want?</Form.Label>
          <div className='mb-3 d-flex flex-sm-row flex-column'>
            { policyTermValues.map(item => (
                <Radio
                  key={`term-${item.label}`}
                  { ...item }
                  type='radio'
                  selected={term.duration === item.value}
                  onChange={() => { setTermObj(item.value, 'duration')} }
                  inline={true}
                />
              )
            )}
          </div>

          <Form.Label>When would you like your policy to start?</Form.Label>
          <Row className="no-gutters">
            { policyStartValues.map(item => (
              <Col md={6}>
                <Radio
                  key={`term-${item.label}`}
                  { ...item }
                  type='radio'
                  selected={term.effective === createDate(item.value)}
                  onChange={() => {
                    if (item.value !== 'custom') {
                      setDisplayDateSelect(false)
                      let timestamp = createDate(item.value)
                      setTermObj(timestamp, 'effective')
                      var expiration = policyExpiry(timestamp, term.duration)
                      setTermObj(expiration, 'expires')
                    } else {
                      setTermObj(createDate('custom'), 'effective')
                      setDisplayDateSelect(true)
                    }
                  }}
                  inline={true}
                />
              </Col>
            ))}
            <Col>
              <div className='mb-3 mr-md-3'>
              <input
                className={`rounded custom-radio-container font-weight-light w-100 ${displayDateSelect ? 'visible' : 'invisible'}`}
                type='date'
                value={getDate(term.effective)}
                onChange={(event) => {
                  let timestamp = createDate(event.target.value)
                  setTermObj(timestamp, 'effective')
                  var expiration = policyExpiry(timestamp, term.duration)
                  setTermObj(expiration, 'expires')
                }}
              />
              </div>
            </Col>
          </Row>

          <Form.Label>Who’s the policy holder?</Form.Label>
          <div className='mb-3 d-flex flex-sm-row flex-column'>
            { policyHolderNameOptions.map((nameOption, index) =>
              <Form.Control
                { ...nameOption }
                key={`driver-${nameOption.name}`}
                className={`font-weight-light mb-2 ${marginClass(policyHolderNameOptions.length, index)}`}
                type="text"
                value={driver[nameOption.name]}
                onChange={setDriverObj}
              />
            )}
          </div>

          <Form.Label>What’s the policy holders address?</Form.Label>
          <div className='mb-3 d-flex flex-sm-row flex-column'>
            <Form.Control
              className="font-weight-light mb-2 mr-2"
              type="text"
              name="line1"
              placeholder="Address"
              value={driver.address.line1}
              onChange={setDriverAddress}
            />

            <Form.Control
              className="font-weight-light mb-2 w-25"
              type="text"
              name="line2"
              placeholder="Apt"
              value={driver.address.line2 || ''}
              onChange={setDriverAddress}
            />
          </div>

          <div className='mb-3 d-flex flex-sm-row flex-column'>
            <Form.Control
              className="font-weight-light mb-2 mr-2"
              type="text"
              name="city"
              placeholder="City"
              value={driver.address.city}
              onChange={setDriverAddress}
            />

            <CustomSelect
              searchable={false}
              options={stateOptions}
              values={[stateOptions.find(option => option.value === driver.address.state )]}
              placeholder="State"
              wrapperClassNames='mr-2 mb-2'
              className="form-control small h-100"
              onChange={setDriverAddressState}
            />

            <Form.Control
              className="font-weight-light mb-2 mr-2"
              type="text"
              name="zip_code"
              placeholder="ZIP"
              value={driver.address.zip_code}
              onChange={setDriverAddress}
            />
          </div>

          <Form.Label>What’s your contact information?</Form.Label>
          <div className='mb-3 d-flex flex-sm-row flex-column'>
            { contactInformationOptions.map((contactOption, index) =>
              <Form.Control
                { ...contactOption }
                key={`contactOption-${contactOption.name}`}
                placeholder={contactOption.label}
                className={`font-weight-light mb-2 ${marginClass(contactInformationOptions.length, index)}`}
                value={driver[contactOption.name] ? driver[contactOption.name] : ""}
                onChange={setDriverObj}
              />
            )}
          </div>

          <Form.Label>And your preferred contact method?</Form.Label>
          <Row>
            { communicationPreferencesOptions.map(optionsObj => (
              <Col md={6} key={`communication_preference_${optionsObj.value}`}>
                <Radio
                  { ...optionsObj }
                  inline={false}
                  name='communication_preference'
                  type='radio'
                  selected={quoteObj.communication_preference === optionsObj.value}
                  onChange={() => changeCommunicationPreference(optionsObj.value)}
                />
              </Col>
            ))}
          </Row>

          <Button className="rounded-pill my-3" size='lg' variant="primary" type="submit" block disabled={false}>
            Save and Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default withTranslation(['vehicles'])(PolicyDetails)
