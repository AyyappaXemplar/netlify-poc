import React               from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Form } from 'react-bootstrap'

import CustomSelect    from '../forms/CustomSelect';
import FormContainer   from '../shared/FormContainer';
import { vehicleTitle } from '../../services/vehicle-display';
import { policyCoverages, replacePolicyCoverages,
                          replaceVehicleCoverages } from '../../services/coverages';

function Coverages({ t }) {
  const vehicles = [
    {
      "id":"b3dd4266-e480-4f12-b289-6e9fa82f47c8",
      "created_at":1605564494,
      "coverage_package_name":"GOOD",
      "logo_url":"https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png",
      "manufacturer":"Acura",
      "model":"MDX",
      "year":2017,
      "trim":"XL"},
    {
      "id":"caff4266",
      "created_at":1605564494,
      "coverage_package_name":"GOOD",
      "logo_url":"https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png",
      "manufacturer":"Acura",
      "model":"MDX",
      "year":2017,
      "trim":"XL"
    }]

  const coveragesOptions = Object.keys(policyCoverages).map(item => ({value: item, label: item}))

  function addPolicyCoverages(values) {
    const coveragePackage = values[0].value

    vehicles.forEach(vehicle => {
      replacePolicyCoverages(vehicle, coveragePackage)
    })
  }

  function addVehicleCoverages(values, id) {
    const vehicle = vehicles.find(item => item.id === id)
    const coveragePackage = values[0].value
    replaceVehicleCoverages(vehicle, coveragePackage)

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
          {vehicles.map((vehicle, index) =>
            <div className='mb-4 mb-sm-5' key={`vehicle-${index}`}>
              <Form.Label>{vehicleTitle(vehicle)}</Form.Label>
              <CustomSelect
                options={coveragesOptions}
                placeholder="Select policy for your vehicle"
                onChange={(values) => addVehicleCoverages(values, vehicle.id)}
              />
            </div>
          )}
        </Form>
      </FormContainer>
    </Container>
  )
}

export default withTranslation(['vehicles'])(Coverages)
