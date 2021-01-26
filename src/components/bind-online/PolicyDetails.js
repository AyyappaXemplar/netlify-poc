import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { withTranslation }            from 'react-i18next'
import { Container, Form, Button }    from 'react-bootstrap'

import Radio         from '../forms/Radio';
import CustomSelect  from '../forms/CustomSelect';
import FormContainer from '../shared/FormContainer';

import history from '../../history'
import { updatePolicyDetails } from '../../actions/bol'
import getDate, { getTimestamp } from '../../services/timestamps'

function initQuote(state) {
  const defaultTerm = { duration: '', effective: '', expires: '' }

  const { quote } = state.data
  const { drivers=[], term=defaultTerm } = quote
  return { drivers, term }
}

function initDriver(quote) {
  const driver = quote.drivers.find(driver => driver.policyholder)
  let { id, address, policyholder, email, phone, first_name, middle_initial, last_name } = driver

  return { id, address, policyholder, email, phone, first_name, middle_initial, last_name }
}

function PolicyDetails({ t, match }) {
  const quote     = useSelector(initQuote)
  const bolStatus = useSelector(state => state.bol.status)

  const [driver, setDriver]         = useState(() => initDriver(quote))
  const [term, setTerm]             = useState(quote.term)
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()

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

  const setDriverObj = (event, prop) => {
    event.persist()

    setDriver(prev => {
      const newDriver = {...prev}
      newDriver[prop] = event.target.value
      return newDriver
    })
  }

  const setDriverAddress = (event, prop) => {
    event.persist()

    setDriver(prev => {
      const newAddress = driver.address

      newAddress[prop] = event.target.value
      return {...driver, address: newAddress}
    })
  }

  const setPrimaryDriver = () => {
    setDriver(prev => ({...prev, policyholder: !prev.policyholder }))
  }

  const policyTermValues = [
    {value: 6, label: '6 Months'},
    {value: 12, label: '12 Months'}
  ]

  const contactInfoOptions = [{
    label: 'Email Address',
    value: 'email'
  }, {
    label: 'Cell Phone',
    value: 'phone'
  }]

  const handleSubmit = (event) => {
    event.preventDefault()
    const quoteParams = { term, id: quote.id }
    dispatch(updatePolicyDetails(quoteParams, driver.id, driver))
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
        <h2 className="mb-5 font-weight-bold ">Policy Details</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Label>Policy Term</Form.Label>
          { policyTermValues.map(item => (
              <Radio
                key={`term-${item.label}`}
                type='radio'
                label={item.label}
                value={item.value}
                selected={term.duration === item.value}
                onChange={() => { setTermObj(item.value, 'duration')} }
              />
            )
          )}

          <Form.Label>Policy Start Date</Form.Label>
          <div className='mb-4 mb-sm-5'>
            <input
              type='date'
              value={getDate(term.effective)}
              onChange={(event) => {
                let timestamp = getTimestamp(event.target.value)
                return setTermObj(timestamp, 'effective')
              }}
            />
          </div>

          <Form.Label>Policy End Date</Form.Label>
          <div className='mb-4 mb-sm-5'>
            <input
              type='date'
              value={getDate(term.expires)}
              onChange={(event) => {
                let timestamp = getTimestamp(event.target.value)
                setTermObj(timestamp, 'expires')}
              }
            />
          </div>

          <Form.Label>Policy Holder Name</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="First Name"
            value={driver.first_name}
            onChange={(event) => setDriverObj(event, 'first_name')}
          />
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="MI"
            value={driver.middle_initial || ''}
            onChange={(event) => setDriverObj(event, 'middle_initial')}
          />
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="Last Name"
            value={driver.last_name}
            onChange={(event) => setDriverObj(event, 'last_name')}
          />

          <Form.Label className="mr-2">Set as primary driver</Form.Label>
          <input
            type='checkbox'
            checked={driver.policyholder}
            onChange={setPrimaryDriver}
          /><br/>

          <Form.Label>Policy Holder Address</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="Address"
            value={driver.address.line1}
            onChange={(event) => setDriverAddress(event, 'line1')}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="Apt"
            value={driver.address.line2 || ''}
            onChange={(event) => setDriverAddress(event, 'line2')}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="City"
            value={driver.address.city}
            onChange={(event) => setDriverAddress(event, 'city')}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="ZIP"
            value={driver.address.zip_code}
            onChange={(event) => setDriverAddress(event, 'zip_code')}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="State"
            value={driver.address.state}
            onChange={(event) => setDriverAddress(event, 'state')}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="County"
            value={driver.address.county || ''}
            onChange={(event) => setDriverAddress(event, 'county')}
          />

          <Form.Label>Contact Info</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="email"
            placeholder="Email Address"
            value={driver.email}
            onChange={(event) => setDriverObj(event, 'email')}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="Cell Phone"
            value={driver.phone || ''}
            onChange={(event) => setDriverObj(event, 'phone')}
          />

          <CustomSelect
            placeholder="Select contact preferences"
            options={contactInfoOptions}
          />

          <Button className="rounded-pill my-3" size='lg' variant="primary" type="submit" block disabled={false}>
            Save and Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default withTranslation(['vehicles'])(PolicyDetails)
