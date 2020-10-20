import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
import { Form, Button }               from 'react-bootstrap';

import { createQuote, zipCodeLookup } from '../../actions/quotes.js'
import history         from '../../history';

import CustomSelect  from '../forms/CustomSelect';
import FormContainer from '../shared/FormContainer';
import BadgeText     from '../shared/BadgeText';

function QuotesNew({ t, setAlert, data }) {
  const [address, setAddress] = useState({ state: '', zip_code: '', city: '', county: ''})
  const [enableSubmit, setEnableSubmit]  = useState(false)
  const addressOptions  = useSelector(state => state.data.addressOptions)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data.quote.id) {
      setAlert({variant: 'success', text:  `Congratulations we cover ${address.zip_code}`})
      history.push('/quotes/edit')
    } else if (data.quote.error){
      history.push(`/quotes/not-covered?location=${address.zip_code}`)
    }
  }, [data.quote, setAlert, address.zip_code])

  useEffect(() => {
    if (address.zip_code.length >= 5) {
      setEnableSubmit(true)
    } else {
      setEnableSubmit(false)
    }
  }, [address])

  const handleChange = (event) => {
    event.persist()
    setAddress(prevState => ({ ...prevState, zip_code: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (addressOptions.length) {
      dispatch(createQuote(address))
    } else {
      dispatch(zipCodeLookup(address.zip_code))
    }
  }

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
                  values={[]}
                  placeholder={"Select your city"}
                  options={addressOptions.map(option => ({ label: `${option.city} (${option.county})`, value: option }))}
                  onChange={(option) => setAddress(option[0].value)}
                />
              </>
            }
          </Form.Group>
          <div className='w-75 mx-auto'>
            <Button className='rounded-pill' size='lg' type="submit" block disabled={!enableSubmit}>
              {t('new.submit')}
            </Button>
          </div>
        </Form>
      </FormContainer>
      <BadgeText/>
    </>
  );

}

export default withTranslation(['quotes'])(QuotesNew);
