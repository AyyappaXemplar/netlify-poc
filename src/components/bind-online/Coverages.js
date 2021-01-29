import React, { useState }              from 'react';
import { useSelector, useDispatch }     from 'react-redux';
import { withTranslation }              from 'react-i18next';
import { Container, Form, Button }      from 'react-bootstrap'

import CustomSelect    from '../forms/CustomSelect';
import FormContainer   from '../shared/FormContainer';
import VehicleCoverage from './vehicle/VehicleCoverages'

import { vehicleTitle }              from '../../services/vehicle-display';
import { updateCoverageForVehicles } from '../../actions/bol'
import { arrayUpdateItemById }       from '../../utilities/array-utilities';
import { policyCoverages, replacePolicyCoverages,
                          replaceVehicleCoverages } from '../../services/coverages';

function Coverages({ t }) {
  const dispatch = useDispatch()
  const vehiclesData = useSelector(state => state.data.quote.vehicles.map( vehicle => {
      const { id, coverages = [] } = vehicle
      return { id, coverages, displayTitle: vehicleTitle(vehicle) }
    })
  )
  const [vehicles, setVehicles] = useState(vehiclesData)

  const coveragesOptions = Object.keys(policyCoverages).map(item => ({value: item, label: item}))

  function addPolicyCoverages(values) {
    const coveragePackage = values[0].value
    const newVehicles = vehicles.map(vehicle => replacePolicyCoverages(vehicle, coveragePackage))
    setVehicles(newVehicles)
  }

  function updateVehicleCoverages(values, id) {
    const coveragePackage = values[0].value
    const vehicle = vehicles.find(item => item.id === id)
    const updatedVehicle = replaceVehicleCoverages(vehicle, coveragePackage)
    setVehicles(prevVehicles => arrayUpdateItemById(prevVehicles, updatedVehicle))
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(updateCoverageForVehicles(vehicles))
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
        <Form onSubmit={handleSubmit}>
          <div className='mb-4 mb-sm-5'>
            <Form.Label>Policy Coverages</Form.Label>
            <CustomSelect
              options={coveragesOptions}
              placeholder="Select policy package"
              onChange={addPolicyCoverages}
            />
          </div>

          <Form.Label>Vehicle Coverages</Form.Label>
          {vehicles.map(vehicle =>
            <VehicleCoverage
              key={`vehicle-coverage-${vehicle.id}`}
              updateCoverage={updateVehicleCoverages}
              vehicle={vehicle}
            />
          )}

          <Button className="rounded-pill my-3" size='lg' variant="primary" type="submit" block disabled={false}>
            Save and Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default withTranslation(['vehicles'])(Coverages)
