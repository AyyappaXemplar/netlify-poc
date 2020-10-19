import React, { useState, useEffect } from 'react';
import { useDispatch }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
import { Form, Button }               from 'react-bootstrap';

import { createQuote } from '../../actions/quotes.js'
import history         from '../../history';

import CustomSelect  from '../forms/CustomSelect';
import FormContainer from '../shared/FormContainer';
import BadgeText     from '../shared/BadgeText';

function QuotesNew({ t, setAlert, data }) {
  const [state, setState]                  = useState('IL')
  const [zipCode, setZipCode]              = useState('')
  const [city, setCity]                    = useState('')
  const [county, setCounty]                = useState('')
  const [enableSubmit, changeEnableSubmit] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data.quote.id) {
      setAlert({variant: 'success', text:  `Congratulations we cover ${zipCode}`})
      history.push('/quotes/edit')
    } else if (data.quote.error){
      history.push(`/quotes/not-covered?location=${zipCode}`)
    }
  }, [data.quote])

  const handleChange = (event) => {
    setZipCode(event.target.value)
    if (event.target.value.length >= 5) {
      changeEnableSubmit(true)
    } else {
      changeEnableSubmit(false)
    }
  }

  const selectCity = (option) => {
    setCity(option[0].value.city)
    setCounty(option[0].value.county)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createQuote({
      zip_code: zipCode,
      address: {
        state,
        city,
        zip_code: zipCode
      }
    }))
  }


  const options = [
    { value: {city: 'cityA', county: 'countyX'}, label: 'City A' },
    { value: {city: 'cityB', county: 'countyY'}, label: 'City B' }
  ]

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
              value={zipCode}
              onChange={handleChange}
              className="mb-3"
            />
            <Form.Label>{t('new.form.city.label')}</Form.Label>
            <CustomSelect
              values={[]}
              placeholder={"Select your city"}
              options={options}
              onChange={selectCity}
            />
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
