import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch }   from 'react-redux';
import { Container, Form, Button }    from 'react-bootstrap';
import { withTranslation }            from 'react-i18next';
import { updateVehicle }  from '../../actions/vehicles'
import { setAlert }       from '../../actions/state'
import { coveragePackages } from '../../constants/vehicle'

import history              from '../../history';
import { groupedCoverages } from '../../services/coverages'

import FormContainer from '../shared/FormContainer';
import Radio         from '../forms/Radio';

function VehiclesCoverages({ match }) {
  const [requestTriggered,
         setRequestTriggered]                 = useState(false)
  const [liability, setLiability]             = useState(undefined)
  const [coverages, setCoverages]             = useState(undefined)
  const [coveragePackage, setCoveragePackage] = useState('GOOD')
  const [disableSubmit, setDisableSubmit] = useState(false)

  const data      = useSelector(state => state.data)
  const vehicleId = match.params.vehicleId
  const vehicle   = data.quote.vehicles.find(vehicle => vehicle.id === vehicleId)

  const dispatch        = useDispatch()
  const updatingVehicle = useSelector(state => state.state.updatingVehicle)

  const handleSubmit = (event, vehicle) => {
    event.preventDefault()
    setRequestTriggered(true)
    dispatch(updateVehicle(vehicleId, { liability_only: liability, coverages, coverage_package_name: coveragePackage }))
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
      window.scrollTo({ top: 0, behavior: "smooth" });
      dispatch(setAlert({variant: 'success', text:  'Successfully updated your vehicle'}))
      history.push('/quotes/vehicles')
    }
  }, [requestTriggered, updatingVehicle, dispatch])

  return (
    <Container className="pt-base">
      <FormContainer bootstrapProperties={{lg: 6}}>
        <Form onSubmit={handleSubmit}>

          <h2>Select your coverage</h2>
          <p className="mb-4 mb-sm-5">Minimum coverage only covers the people and property you hurt or damage–not you or your vehicle. Do you want to spend a little extra to cover the costs of your repairs?</p>

          <Form.Label>Add full coverage for your {vehicle.year} {vehicle.manufacturer} {vehicle.model}?</Form.Label>

          <div className='mb-4 mb-sm-5'>
            <Radio
              type={'radio'} id={`a`}
              label={'Yes, add full coverage to protect me and my vehicle'}
              value={false}
              selected={liability === false}
              onChange={() => setLiability(false)}
            />
            <Radio
              type={'radio'} id={`b`}
              label={'No thanks, I\'m good with minimum coverage'}
              value={true}
              selected={liability === true}
              onChange={() => setLiability(true)}
            />
          </div>
          <div className='w-100 w-sm-75 mx-auto d-flex flex-column align-items-center'>
            <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={disableSubmit}>
              Save &amp; Continue
            </Button>
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default withTranslation(['vehicles'])(VehiclesCoverages)
