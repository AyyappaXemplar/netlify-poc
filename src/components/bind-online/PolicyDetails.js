import React, { useState }          from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation }          from 'react-i18next';
import { Container, Form, Button }  from 'react-bootstrap'

import Radio         from '../forms/Radio';
import CustomSelect  from '../forms/CustomSelect';
import FormContainer from '../shared/FormContainer';

import { updatePolicyDetails } from '../../actions/bol'


function initQuote(state) {
  const defaultTerm = { duration: '', effective: '', expiration: '' }

  const { quote } = state.data
  const { drivers=[], term=defaultTerm } = quote
  return { drivers, term }
}

function PolicyDetails({ t }) {
  const quote = useSelector(initQuote)
  const [driver, setDriver] = useState(() => {
    const driver = quote.drivers.find(driver => driver.policyholder)
    let { id, address, policyholder, email, phone, first_name, middle_initial, last_name } = driver

    return { id, address, policyholder, email, phone, first_name, middle_initial, last_name }
  })

  const [term, setTerm]     = useState(quote.term)
  const dispatch = useDispatch()

  const setTermObj = (value, prop) => {
    setTerm(prevTerm => {
      const newTerm = {...term}
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
    dispatch(updatePolicyDetails(quote, driver.id, driver))
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
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
              onChange={(event) => setTermObj(event.target.value, 'effective')}
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
