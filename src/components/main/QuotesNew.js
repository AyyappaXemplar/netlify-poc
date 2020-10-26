import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
import { Form, Button }               from 'react-bootstrap';

import { createQuote, zipCodeLookup } from '../../actions/quotes.js'
import history         from '../../history';

import CustomSelect  from '../forms/CustomSelect';
import FormContainer from '../shared/FormContainer';
import BadgeText     from '../shared/BadgeText';
import SpinnerScreen     from '../shared/SpinnerScreen';

function QuotesNew({ t, setAlert, data, location }) {
  const [address, setAddress]             = useState({state: '', zip_code: '', city: '', county: ''})
  const [enableSubmit, setEnableSubmit]   = useState(false)
  const [showSpinner, setShowSpinner]     = useState(false)
  const [renderForm, setRenderForm]       = useState(false)
  const [initSearch, setInitSearch]       = useState(false)
  const [submitSpinner, setSubmitSpinner] = useState(false)

  const addressOptions   = useSelector(state => state.data.addressOptions)
  const lookingUpZipCode = useSelector(state => state.state.lookingUpZipCode)
  const dispatch = useDispatch()

  let queryParams = location?.search?.match(/zip_code=(\d{5})/)
  queryParams = queryParams ? queryParams[1] : null

  useEffect(() => {
    if (queryParams) {
      setAddress({ zip_code: queryParams })
      dispatch(zipCodeLookup(queryParams))
      setShowSpinner(true)
    } else {
      setRenderForm(true)
    }
  }, [queryParams, dispatch])

  useEffect(() => {
    if (!queryParams) return

    if (!initSearch && lookingUpZipCode) {
      setInitSearch(true)
    } else if (initSearch && !lookingUpZipCode && addressOptions.length) {
      setShowSpinner(false)
      setRenderForm(true)
    }
  }, [queryParams, initSearch, lookingUpZipCode, addressOptions])

  useEffect(() => {
    if (!lookingUpZipCode && addressOptions.length) {
      setSubmitSpinner(false)
    }
  }, [initSearch, lookingUpZipCode, addressOptions])

  useEffect(() => {
    if (data.quote.id) {
      setAlert({variant: 'success', text:  `Congratulations we cover ${address.zip_code}`})
      history.push('/quotes/edit')
    } else if (data.quote.error){
      history.push(`/quotes/not-covered?location=${address.zip_code}`)
    }
  }, [data.quote, setAlert, address.zip_code])

  useEffect(() => {
    if (address.zip_code.match(/^\d{5}$/)) {
      setEnableSubmit(true)
    } else {
      setEnableSubmit(false)
    }
  }, [address])

  const dropdownAddressOptions = () => {
    return addressOptions.map((option, index) => {
      return {
        label: `${option.city} (${option.county})`,
        value: option,
        index
      }
    })
  }

  const getSubmitContent = () => {
    return submitSpinner ? (
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>) : t('new.submit')
  }

  const handleChange = (event) => {
    event.persist()
    setAddress(prevState => ({ ...prevState, zip_code: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitSpinner(true)
    setEnableSubmit(false)

    if (addressOptions.length) {
      dispatch(createQuote(address))
    } else {
      dispatch(zipCodeLookup(address.zip_code))
    }
  }

  if (showSpinner) {
    return <SpinnerScreen title="Checking your zip code for coverage"/>
  }

  if (!renderForm) {
    return false
  } else {
    return (
      <>
        <FormContainer bootstrapProperties={{lg: 6, xl: 5}}>
          <h2 className="mb-5 font-weight-bold">{t('new.title')}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-5">
              <Form.Label>{t('new.form.zip.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder="12345"
                value={address.zip_code}
                onChange={handleChange}
                className="mb-3"
              />

              { !!addressOptions.length &&
                <>
                  <Form.Label>{t('new.form.city.label')}</Form.Label>
                  <CustomSelect
                    valueField={'index'}
                    placeholder={'Select your city'}
                    options={dropdownAddressOptions()}
                    onChange={(option) => setAddress(option[0].value)}
                  />
                </>
              }
            </Form.Group>
            <div className='w-75 mx-auto'>
              <Button className='rounded-pill' size='lg' type="submit" block disabled={!enableSubmit}>
                { getSubmitContent()  }
              </Button>
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuotesNew);
