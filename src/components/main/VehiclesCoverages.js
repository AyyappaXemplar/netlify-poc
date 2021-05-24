import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch }   from 'react-redux';
import { Container, Form, Button }    from 'react-bootstrap';
import { withTranslation }            from 'react-i18next';
import { updateVehicle }  from '../../actions/vehicles'
import { setAlert }       from '../../actions/state'
import { coveragePackages } from '../../constants/vehicle'

import history              from '../../history';
import mixpanel             from '../../config/mixpanel';
import { groupedCoverages } from '../../services/coverages'

import FormContainer from '../shared/FormContainer';
import Radio         from '../forms/Radio';

import { Helmet } from 'react-helmet'

function VehiclesCoverages({ match, t }) {
  const [requestTriggered,
         setRequestTriggered]                 = useState(false)
  const [liability, setLiability]             = useState(undefined)
  const [coverages, setCoverages]             = useState(undefined)
  const [coveragePackage, setCoveragePackage] = useState('GOOD')
  const [disableSubmit, setDisableSubmit]     = useState(false)

  const { data }      = useSelector(state => state)
  const { vehicleId } = match.params
  const vehicle   = data.quote.vehicles.find(vehicle => vehicle.id === vehicleId)

  const dispatch            = useDispatch()
  const { updatingVehicle } = useSelector(state => state.state)

  const handleSubmit = (event) => {
    event.preventDefault()
    mixpanel.track('Prompted for full/basic coverage', {liabilityOnly: liability})
    setRequestTriggered(true)
    dispatch(updateVehicle(vehicleId, { ...vehicle, liability_only: liability, coverages, coverage_package_name: coveragePackage }))
  }

  useEffect(() => {
    if (liability) {
      setCoverages(groupedCoverages.LIABILITY)
      setCoveragePackage(coveragePackages.LIABILITY)
    } else {
      setCoverages(groupedCoverages.GOOD)
      setCoveragePackage(coveragePackages.GOOD)
    }
  }, [liability])

  useEffect(() => {
    if (requestTriggered) {
      setDisableSubmit(true)
    } else if ([true, false].includes(liability)) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
  }, [liability, requestTriggered])


  useEffect(() => {
    if (requestTriggered && !updatingVehicle) {
      dispatch(setAlert({variant: 'success', text:  t("successfullyUpdatedYourVehicle")}))
      history.push('/quotes/vehicles')
    }
  }, [requestTriggered, updatingVehicle, dispatch, t])

  return (
    <Container className="pt-base">
      <Helmet>
        <title>Select your coverage | InsureOnline.com</title>
      </Helmet>
      <FormContainer bootstrapProperties={{lg: 6}}>
        <Form onSubmit={handleSubmit}>

          <h2>{t("vehiclesCoverages.title")}</h2>
          <p className="mb-4 mb-sm-5">{t("vehiclesCoverages.description")}</p>

          <Form.Label>{t("vehiclesCoverages.labels.content-1")}</Form.Label>

          <div className='mb-4 mb-sm-5'>
            <Radio
              type={'radio'} id={`a`}
              label={t("vehiclesCoverages.labels.content-2")}
              value={false}
              selected={liability === false}
              onChange={() => setLiability(false)}
            />
            <Radio
              type={'radio'} id={`b`}
              label={t("vehiclesCoverages.labels.content-3")}
              value={true}
              selected={liability === true}
              onChange={() => setLiability(true)}
            />
          </div>
          <div className='w-100 w-sm-75 mx-auto d-flex flex-column align-items-center'>
            <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={disableSubmit}>
              {t('form.submit')}
            </Button>
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default withTranslation(['vehicles'])(VehiclesCoverages)
