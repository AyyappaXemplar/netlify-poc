import React, { useState } from 'react';
import { useSelector }     from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Container, Form } from 'react-bootstrap'

import CustomSelect    from '../forms/CustomSelect';
import FormContainer   from '../shared/FormContainer';
import VehicleCoverage from './vehicle/VehicleCoverages'

import { arrayUpdateItemById } from '../../utilities/array-utilities';
import { policyCoverages, replacePolicyCoverages,
                          replaceVehicleCoverages } from '../../services/coverages';

function Coverages({ t }) {
  // const vehiclesData = [
  //   {
  //     "id":"b3dd4266-e480-4f12-b289-6e9fa82f47c8",
  //     "created_at":1605564494,
  //     "coverage_package_name":"GOOD",
  //     "logo_url":"https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png",
  //     "manufacturer":"Acura",
  //     "model":"MDX",
  //     "year":2017,
  //     "trim":"XL"},
  //   {
  //     "id":"caff4266",
  //     "created_at":1605564494,
  //     "coverage_package_name":"GOOD",
  //     "logo_url":"https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png",
  //     "manufacturer":"Acura",
  //     "model":"MDX",
  //     "year":2018,
  //     "trim":"XL"
  //   }]
  const vehiclesData = useSelector(state => state.data.quote.vehicles)
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

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
        <Form>
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
        </Form>
      </FormContainer>
    </Container>
  )
}

export default withTranslation(['vehicles'])(Coverages)
