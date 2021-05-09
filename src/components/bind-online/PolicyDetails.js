import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { withTranslation }            from 'react-i18next'
import { Container, Form, Button,
         Row, Col }                   from 'react-bootstrap'
import * as dayjs                     from 'dayjs';

import Radio         from '../forms/Radio';
import FormContainer from '../shared/FormContainer';
import CustomSelect  from '../forms/CustomSelect';
import FormAlert     from "../shared/FormAlert";

import history from '../../history'
import { updatePolicyDetails }                 from '../../actions/bol'
import getDate, { policyExpiry, getTimestamp } from '../../services/timestamps'
import { addressValidation } from "../../services/address-validation"
import AddressValidate from "./AddressValidate"
import validatePolicyDetailsForm               from '../../validators/bind-online/PolicyDetailsForm'
import BadgeText                               from '../shared/BadgeText';
import { Helmet } from 'react-helmet'

function initQuote(state) {
  const defaultTerm = { duration: '', effective: '', expires: '' }

  const { quote } = state.data
  const { drivers=[], term=defaultTerm } = quote

  return { ...quote, drivers, term }
}

function PolicyDetails({ t, match }) {
  const quote     = useSelector(initQuote)
  const bolStatus = useSelector(state => state.bol.status)

  const [errors, setErrors]         = useState([])
  const [driver, setDriver]         = useState(quote.drivers.find(driver => driver.policyholder))
  const [term, setTerm]             = useState(() => {
    const term = { ...quote.term }

    // convert timestamps to data format
    if (term.effective && (typeof term.effective === 'number')) {
      term.effective = getDate(term.effective)
    }

    if (term.expires  && (typeof term.expires === 'number')) {
      term.expires = getDate(term.expires)
    }
    return term
  })

  const [communications, setCommunications]     = useState({ communication_preference: driver.communication_preference })
  const [submitting, setSubmitting] = useState(false)
  const [startDate, setStartDate]   = useState('tomorrow')
  const dispatch = useDispatch()
  const [suggestedAddress, setSuggestedAddress] = useState()
  const [displayDateSelect, setDisplayDateSelect] = useState(false)
  const [showSuggestedAddress, setShowSuggestedAddress] = useState(false)
  const [alreadyDisplayed, setAlreadyDisplayed] = useState(false)

  // TODO: we might not need to keep the state in sync with redux when we move to the URL workflow
  // useEffect(() => { setDriver(initDriver(quote)) }, [quote])

  useEffect(() => {
    if (!match) return

    if (bolStatus === 'Updating policy details') {
      setSubmitting(true)
    } else if (submitting && !bolStatus) {
      history.push(`/bol/drivers/${driver.id}/edit`)
    }

  }, [bolStatus, match, submitting, driver.id])

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
    setCommunications({ communication_preference: value })
  }

  const policyTermValues = [
    { value: 6,  label: '6 Months' },
    { value: 12, label: '12 Months' }
  ]

  const policyStartValues = [
    { value: 'tomorrow', label: 'Immediately (Next day)',
      date: dayjs().add(1, 'day').format('YYYY-MM-DD') },
    { value: 'custom', label: 'Custom date',
      date: dayjs().add(1, 'day').format('YYYY-MM-DD') }
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

  // TODO: Uncomment these lines when other states are covered as valid address state
  // let stateOptions = require('../../data/US-state-options')
  // stateOptions = stateOptions.map(item => [({...item, label: item.value}))]
  const stateOptions = [{"value": "IL", "label": "IL"},]

  const handleSubmit = (event) => {
    event.preventDefault()

    const residence_info = {
      "current_residence_date": dayjs().toISOString(),
      "ownership": quote.homeowner ? "owned" : "rented",
    }

    const termParams = { ...term,
      effective: getTimestamp(term.effective),
      expires: policyExpiry(term.effective, term.duration)
    }

    const quoteParams = { ...quote, term: termParams, residence_info }
    const driverParams = { ...driver, ...communications}

    let validAddress

    addressValidation(driver.address).then(response => {
      validAddress = response.data

      if (validAddress.isValid || alreadyDisplayed) {
        const validationErrors = validatePolicyDetailsForm({...quoteParams, ...driverParams })
        if (validationErrors) {
          setErrors(err => Object.values(validationErrors).flat())
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          setErrors([])
          dispatch(updatePolicyDetails(quoteParams, driver.id, driverParams))
        }
      } else
      {
        // Below 2 lines changes 'zip' response from backend to 'zip_code'
        validAddress.suggestedAddress.zip_code = validAddress.suggestedAddress.zip
        delete validAddress.suggestedAddress.zip
        setSuggestedAddress(validAddress.suggestedAddress)
        setShowSuggestedAddress(true)
      }
    })
  }

  const cancelSubmit = (event) => {
    event.preventDefault();
    history.push(`/quotes/${quote.id}/rates/`)
}

  const policyStartSelect = (item) => {
    setStartDate(item.value)
    setTermObj(item.date, 'effective')
    setDisplayDateSelect(item.value === 'custom')
  }

  const customPolicyStartSelect = (event) => {
    setTermObj(event.target.value, 'effective')
  }

  const checkIndex = (index) => {
    return index % 2
  }

  return (
    <Container className="pt-base">
      <Helmet>
        <title>Policy Details | InsureOnline.com</title>
      </Helmet>
      <FormContainer bootstrapProperties={{ lg:6}}>
        { !!errors.length && errors.map((err, index) =>
          <FormAlert key={`error-${index}`} text={err}/>
        )}

        <h2 className="mb-5 font-weight-bold ">Policy Details</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Label>How long of a policy do you want?</Form.Label>
          <Row className='mb-3 '>
            { policyTermValues.map((item, index) => (
                <Col md={6} className={ checkIndex(index) ? "pl-md-1" : "pr-md-1"} key={index+1}>
                  <Radio
                  key={`term-${item.label}`}
                  { ...item }
                  type='radio'
                  selected={term.duration === item.value}
                  onChange={() => { setTermObj(item.value, 'duration')} }
                  inline={true}
                />
                </Col>
              )
            )}
          </Row>

          <Form.Label>When would you like your policy to start?</Form.Label>
          <Row className='mb-3 '>
            { policyStartValues.map((item, index) => (
              <Col md={6} key={`term-${item.label}`} 
              className={ checkIndex(index) ? "pl-md-1" : "pr-md-1"}>
                <Radio
                  { ...item }
                  type='radio'
                  selected={startDate === item.value}
                  onChange={() => policyStartSelect(item) }
                  inline={true}
                />
              </Col>
            ))}
            
            <Col md={6} className="pl-md-1">
              <input
                className={`bol-date rounded custom-radio-container font-weight-light w-100 ${displayDateSelect ? 'd-flex' : 'd-none'}`}
                type='date'
                value={term.effective}
                onChange={customPolicyStartSelect}
              />
            </Col>
          </Row>

          <Form.Label>Who’s the policy holder?</Form.Label>
          <Row className="mb-3">
            { policyHolderNameOptions.map((nameOption, index) =>
              <Col md={6} className={`mb-1 ${checkIndex(index) ? "pl-md-1" : "pr-md-1"}`} key={index+1}>
              <Form.Control
                { ...nameOption }
                key={`driver-${nameOption.name}`}
                className={`font-weight-light mb-1 ${marginClass(policyHolderNameOptions.length, index)}`}
                type="text"
                value={driver[nameOption.name]}
                onChange={setDriverObj}
              /></Col>
            )}
          </Row>

          <Form.Label>What’s the policy holders address?</Form.Label>
          <Row className='mb-md-1'>
            <Col md={9} className="pr-md-1 mb-2">
            <Form.Control
              required={true}
              className="font-weight-light"
              type="text"
              name="line1"
              placeholder="Address"
              value={driver.address.line1}
              onChange={setDriverAddress}
            />
            </Col>

            <Col md={3} className="pl-md-1 mb-2">
            <Form.Control
              className="font-weight-light"
              type="text"
              name="line2"
              placeholder="Apt"
              value={driver.address.line2 || ''}
              onChange={setDriverAddress}
            />
            </Col>
          </Row>

          <Row className='mb-3 '>
            <Col md={6} className="pr-md-1">
            <Form.Control
              className="font-weight-light mb-2 mr-2"
              type="text"
              name="city"
              placeholder="City"
              value={driver.address.city}
              onChange={setDriverAddress}
            />
            </Col>

            <Col md={2} className="px-md-1">
            <CustomSelect
              searchable={false}
              options={stateOptions}
              values={[stateOptions.find(option => option.value === driver.address.state )]}
              placeholder="State"
              wrapperClassNames='mb-2'
              className="form-control small h-100"
              onChange={setDriverAddressState}
            /></Col>

            <Col md={4} className="pl-md-1">
            <Form.Control
              className="font-weight-light mb-2 mr-2"
              type="text"
              name="zip_code"
              placeholder="ZIP"
              value={driver.address.zip_code}
              onChange={setDriverAddress}
            />
            </Col>
          </Row>

          <Form.Label>What’s your contact information?</Form.Label>
          <Row className='mb-3 '>
            { contactInformationOptions.map((contactOption, index) =>
              <Col md={6} className={ checkIndex(index) ? "pl-md-1" : "pr-md-1" } key={index+1}>
                <Form.Control
                { ...contactOption }
                key={`contactOption-${contactOption.name}`}
                placeholder={contactOption.label}
                className={`font-weight-light mb-2 ${marginClass(contactInformationOptions.length, index)}`}
                value={driver[contactOption.name] ? driver[contactOption.name] : ""}
                onChange={setDriverObj}
              />
              </Col>
            )}
          </Row>

          <Form.Label>And your preferred contact method?</Form.Label>
          <Row className='mb-3 '>
            { communicationPreferencesOptions.map((optionsObj, index) => (
              <Col md={6} key={`communication_preference_${optionsObj.value}`} className={ checkIndex(index) ? "pl-md-1" : "pr-md-1" }>
                <Radio
                  { ...optionsObj }
                  inline={false}
                  name='communication_preference'
                  type='radio'
                  selected={communications.communication_preference === optionsObj.value}
                  onChange={() => changeCommunicationPreference(optionsObj.value)}
                />
              </Col>
            ))}

          </Row>

          <Button className="rounded-pill mt-5 my-3" size='lg' variant="primary" type="submit" block disabled={false}>Save and Continue</Button>
          <Row className="justify-content-center">
            <Col xs={12} md={5} className="d-flex justify-content-center">
              <Button variant="link" className="text-med-dark text-decoration-none" onClick={(event)=>cancelSubmit(event)}>Cancel and Return</Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
      <div>
        { suggestedAddress && !alreadyDisplayed ?
          <AddressValidate
            suggestedAddress={suggestedAddress}
            driverAddress={driver.address}
            show={showSuggestedAddress}
            setShow={setShowSuggestedAddress}
            setDriver={setDriver}
            setAlreadyDisplayed={setAlreadyDisplayed}
            quote={quote}
            driver={driver}
            communications={communications}
            term={term}
          />
          : null }
      </div>
      <BadgeText />
    </Container>
  )
}

export default withTranslation(['vehicles'])(PolicyDetails)