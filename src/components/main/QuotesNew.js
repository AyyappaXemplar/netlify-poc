import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
import { Form, Button }               from 'react-bootstrap';
import { useTranslation }             from 'react-i18next';

import { createQuote, zipCodeLookup } from '../../actions/quotes.js'
import history         from '../../history';

import CustomSelect  from '../forms/CustomSelect';
import FormContainer from '../shared/FormContainer';
import BadgeText     from '../shared/BadgeText';
import SpinnerScreen     from '../shared/SpinnerScreen';


const initialState = {
  address: {
    state: '',
    zip_code: '',
    city: '',
    county: ''
  },
  enableSubmit: false,
  renderForm: false,
  submitSpinner: false
};

function quotesNewReducer(state, action) {
  switch (action.type) {
    case 'setAddress': {
      const address = { ...state.address, ...action.address }
      return { ...state, address };
    }
    case 'setZipCode': {
      const address = { ...state.address, zip_code: action.zip_code }
      return { ...state, address };
    }
    case 'setEnableSubmit': {
      return { ...state, enableSubmit: action.enableSubmit }
    }
    case 'displayForm': {
      return { ...state, submitSpinner: false, showSpinner: false, renderForm: true}
    }
    case 'startZipCodeLookup': {
      const address = { ...state.address, zip_code: action.zip_code }
      return { ...state, showSpinner: true, address}
    }
    case 'submitForm': {
      return { ...state, enableSubmit: false, submitSpinner: true }
    }
    default:
      throw new Error();
  }
}

function GetSubmitContent({ submitSpinner, children }) {
  const { t } = useTranslation();
  return submitSpinner ? (
    <div className="spinner-border spinner-border-sm text-light" role="status">
      <span className="sr-only">Loading...</span>
    </div>) : t('quotes:new.submit')
}

function QuotesNew({ t, setAlert, data, location }) {
  const [state, localDispatch] = useReducer(quotesNewReducer, initialState);
  const addressOptions   = useSelector(state => state.data.addressOptions)
  const lookingUpZipCode = useSelector(state => state.state.lookingUpZipCode)
  const dispatch = useDispatch()

  let queryParams = location?.search?.match(/zip_code=(\d{5})/)
  queryParams = queryParams ? queryParams[1] : null

  useEffect(() => {
    if (queryParams) {
      localDispatch({ type: "startZipCodeLookup", zip_code: queryParams})
      dispatch(zipCodeLookup(queryParams))
    } else {
      localDispatch({type: 'displayForm'})
    }
  }, [dispatch, queryParams])

  useEffect(() => {
    if (!lookingUpZipCode && addressOptions.length) localDispatch({type: 'displayForm'})
  }, [lookingUpZipCode, addressOptions])

  useEffect(() => {
    if (data.quote.id) {
      setAlert({variant: 'success', text: `Congratulations we cover ${state.address.zip_code}`})
      history.push('/quotes/edit')
    } else if (data.quote.error){
      history.push(`/quotes/not-covered?location=${state.address.zip_code}`)
    }
  }, [data.quote, setAlert, state.address.zip_code])

  useEffect(() => {
    const enableSubmit = !!state.address.zip_code.match(/^\d{5}$/)
    localDispatch({ type: 'setEnableSubmit', enableSubmit })
  }, [state.address])

  const dropdownAddressOptions = () => {
    return addressOptions.map((option, index) => {
      return {
        label: `${option.city} (${option.county})`,
        value: option,
        index
      }
    })
  }

  const handleChange = (event) => {
    event.persist()
    localDispatch({ type: 'setZipCode', zip_code: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    localDispatch({ type: 'submitForm'})

    if (addressOptions.length) {
      dispatch(createQuote(state.address))
    } else {
      dispatch(zipCodeLookup(state.address.zip_code))
    }
  }

  if (state.showSpinner) {
    return <SpinnerScreen title="Checking your zip code for coverage"/>
  }

  if (!state.renderForm) {
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
                value={state.address.zip_code}
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
                    onChange={(option) => localDispatch({type: 'setAddress', address: option[0].value })}
                  />
                </>
              }
            </Form.Group>
            <div className='w-75 mx-auto'>
              <Button className='rounded-pill' size='lg' type="submit" block disabled={!state.enableSubmit}>
                <GetSubmitContent submitSpinner={state.submitSpinner}/>
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
