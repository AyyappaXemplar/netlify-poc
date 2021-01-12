import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Container, Row, Form } from 'react-bootstrap'

import { groupedCoverages } from '../../services/coverages'
import { coveragePackages } from '../../constants/vehicle'

import VehicleSearch from '../forms/VehicleSearch'
import Radio         from '../forms/Radio';
import FormContainer from '../shared/FormContainer';

function Vehicle({ t }) {
  const [vehicle, setVehicle] = useState({ year_mileage: '', mileage: '' })

  const setVehicleFromSearch = (vehicleProps) => {
    setVehicle(vehicle => ({ ...vehicle, ...vehicleProps }))
  }


  const VehicleUseCodeChange = (value) => {
    setVehicle(vehicle => {
      let newVehicle = { ...vehicle }

      newVehicle.use_code = value

      if (vehicle.use_code !== "business") {
        newVehicle.tnc = false
        newVehicle.individual_delivery = false
      }
      return newVehicle
    })
  }

  const vehicleUseCodeRadios = () => {

    return t('form.fields.use.useCodevalues').map((item, index) => {
      let label = t(`form.fields.use.useCode.${item}.label`)
      let value = t(`form.fields.use.useCode.${item}.value`).toLowerCase()
      let onChange = () => VehicleUseCodeChange(value)

      return (
        <Radio
          type={'radio'} id={`info-car-${value}`}
          label={label}
          value={value}
          key={index}
          selected={vehicle.use_code === value}
          onChange={onChange}
        />
      )
    })
  }

  const tncUsageChange = (item) => {
    setVehicle(vehicle => {
      const newVehicle  = { ...vehicle }
      newVehicle[item.name] = !newVehicle[item.name]

      if (newVehicle.tnc || newVehicle.individual_delivery ) {
        if (newVehicle.use_code !== "business") {
          newVehicle.use_code = "business"
        }
      } else if (!newVehicle.tnc && !newVehicle.individual_delivery ) {
        // If neither is selected, we can revert the
        // use_code to null so user can select
        newVehicle.use_code = null;
      }

      return newVehicle
    })
  }

  const tncUseCheckBoxes = () => {
    return t('form.fields.tncUsage.attributes').map(item => {
      let onChange = () => tncUsageChange(item)

      return(
        <Radio
          key={item.name}
          type='checkbox'
          label={item.label}
          value={vehicle[item.name]}
          selected={vehicle[item.name]}
          onChange={onChange}
        />
      )
    })
  }

  const lienholderCheckBoxes = () => {
    let values = [
      {value: true, label: 'yes'},
      {value: false, label: 'no'}
    ]
    return values.map(item => {
      let onChange = () => setVehicle( vehicle => ( {...vehicle, lienholder: item.value }))

      return(
        <Radio
          key={`lienholder-${item.label}`}
          type='radio'
          label={item.label}
          value={item.value}
          selected={vehicle.lienholder === item.value}
          onChange={onChange}
        />
      )
    })
  }

  const updateVehicle = (event, property) => {
    event.preventDefault()
    let value = event.target.value

    setVehicle(vehicle => {
      let newVehicle = { ...vehicle }
      newVehicle[property] = value || ''
      return newVehicle
    })
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
        <Form>
          <div className='mb-4 mb-sm-5'>
            <Form.Label>{t('form.fields.vehicle.label')}</Form.Label>
            <VehicleSearch onChange={() => console.log('i')}/>
          </div>

          <Form.Label>{t('form.fields.use.label')}</Form.Label>
           <div className='mb-4 mb-sm-5'>
            { vehicleUseCodeRadios() }
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>{t('form.fields.tncUsage.label')}</Form.Label>
            {tncUseCheckBoxes()}
            <small className="form-text text-muted">{t('form.fields.tncUsage.smallText')}</small>
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>Vehicle Mileage</Form.Label>
            <Form.Control
              className="font-weight-light"
              type="text"
              placeholder={'62,400'}
              value={vehicle.mileage}
              onChange={(event) => updateVehicle(event, 'mileage') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>Vehicle Mileage/Yr</Form.Label>
            <Form.Control
              className="font-weight-light"
              type="text"
              placeholder={'10,000/Yr'}
              value={vehicle.year_mileage}
              onChange={(event) => updateVehicle(event, 'year_mileage') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>Lienholder</Form.Label>
            { lienholderCheckBoxes() }
          </div>
          <br></br>

          <input className='mx-2' type='submit' name='use_code'/>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default withTranslation(['vehicles'])(Vehicle)
