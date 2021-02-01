import React, { useState, useReducer } from 'react';
import { useDispatch }     from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Container, Form, Button } from 'react-bootstrap'

import { vehicleTitle }        from '../../services/vehicle-display';
import { updatePolicyVehicle } from '../../actions/bol';

import Lienholder    from './vehicle/Lienholder'
import VehicleSearch from '../forms/VehicleSearch'
import Radio         from '../forms/Radio';
import FormContainer from '../shared/FormContainer';
import VehicleCard from '../../components/bind-online/vehicle/VehicleCard'


function init(vehicleProps) {
  const defaultLienholder = {
    name: '',
    // type: 1,
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip_code: ''
    }
  }

  const { manufacturer, model, year, trim, id, use_code,
          current_mileage = 0, estimated_annual_distance = '', tnc=false, individual_delivery=false,
          logo_url, vin } = vehicleProps
  const lienholder = vehicleProps.lienholder || defaultLienholder

  return { manufacturer, model, year, trim, lienholder, use_code, current_mileage,
           estimated_annual_distance, tnc, individual_delivery, id, logo_url, vin }
}

function vehicleReducer(vehicle, action) {
  switch (action.type) {
    case 'updateVehicle': {
      return { ...vehicle, ...action.payload }
    }
    case 'updateUseCode': {
      vehicle.use_code = action.payload

      if (action.payload !== "business") {
        vehicle.tnc = false
        vehicle.individual_delivery = false
      }

      return { ...vehicle }
    }
    case 'updateTNC': {
      const name = action.payload
      const newVehicle = {...vehicle}
      newVehicle[name] = !newVehicle[name]

      const notOfferingServices = newVehicle.tnc || newVehicle.individual_delivery
      const businessUse = newVehicle.use_code !== "business"

      if (notOfferingServices && businessUse) newVehicle.use_code = "business"

      return { ...newVehicle }
    }
    case 'updateLienholder': {
      const newAttributes = action.payload
      const newLienholder = { ...vehicle.lienholder, ...newAttributes }
      return {...vehicle, lienholder: newLienholder }
    }
    case 'updateLienholderAddress': {
      const newAttributes = action.payload
      const newAddress = { ...vehicle.lienholder.address, ...newAttributes }
      return {...vehicle, lienholder: { ...vehicle.lienholder, address: newAddress } }
    }
    default:
      throw new Error();
  }
}

function Vehicle({ t, vehicle: vehicleProp }) {
  const dispatch                            = useDispatch()
  const [displayVehicle, setDisplayVehicle] = useState(true)
  const [vehicle, localDispatch]            = useReducer(vehicleReducer, vehicleProp, init)

  const vehicleUseCodeRadios = () => {
    return t('form.fields.use.useCodevalues').map((item, index) => {
      let label = t(`form.fields.use.useCode.${item}.label`)
      let value = t(`form.fields.use.useCode.${item}.value`).toLowerCase()
      let onChange = () => localDispatch({ type: 'updateUseCode', payload: value })

      return (
        <Radio
          key={`info-car-${value}`}
          type={'radio'}
          label={label}
          value={value}
          selected={vehicle.use_code === value}
          onChange={onChange}
        />
      )
    })
  }

  const tncUseCheckBoxes = () => {
    return t('form.fields.tncUsage.attributes').map(item => {
      let onChange = () => localDispatch({type: 'updateTNC', payload: item.name})

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

  const updateVehicle = (event, property) => {
    event.preventDefault()
    const value = event.target.value
    const newProps = {}
    newProps[property] = value

    localDispatch({ type: 'updateVehicle', payload: newProps })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let { current_mileage, estimated_annual_distance } = vehicle
    current_mileage           = parseInt(current_mileage)
    estimated_annual_distance = parseInt(estimated_annual_distance)
    const vehicleParams = { ...vehicle, current_mileage, estimated_annual_distance }

    dispatch(updatePolicyVehicle(vehicle.id, vehicleParams))
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
        <h3 onClick={() => setDisplayVehicle(!displayVehicle)}>
          { displayVehicle ? '-' : '+'} {vehicleTitle(vehicle)}
        </h3>
        <Form style={{display: displayVehicle ? "block" : "none"}} onSubmit={handleSubmit}>
          {/*<div className="mb-4 mb-sm-5">
            <Form.Label>
              {t('form.fields.vehicle.label')}
              <small className='form-text text-danger'>
                Temporarily enabling changing the vehicle, for single page form testing
              </small>
            </Form.Label>
            <VehicleSearch
              onChange={ (vehicleProps) => {
                localDispatch({type: 'updateVehicle', payload: vehicleProps })}
              }
            />
          </div>
          */}

          <div className='mb-4 mb-sm-5'>
            <Form.Label>What's the VIN Number?</Form.Label>
            <Form.Control
              className="font-weight-light mb-3"
              type="text"
              placeholder={'4Y1SL65848Z411439'}
              value={vehicle.vin}
              onChange={(event) => updateVehicle(event, 'vin') }
            />
            <VehicleCard vehicle={vehicle} />
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
              type="number"
              placeholder={'62,400'}
              value={vehicle.current_mileage}
              onChange={(event) => updateVehicle(event, 'current_mileage') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>Vehicle Mileage/Yr</Form.Label>
            <Form.Control
              className="font-weight-light"
              type="number"
              placeholder={'10,000/Yr'}
              value={vehicle.estimated_annual_distance}
              onChange={(event) => updateVehicle(event, 'estimated_annual_distance') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Lienholder lienholder={vehicle.lienholder} dispatch={localDispatch}/>
          </div>

          <div className='w-100 w-sm-75 mx-auto'>
            <Button className="rounded-pill my-3" size='lg' variant="primary" type="submit" block disabled={false}>
              Save and Continue
            </Button>
          </div>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default withTranslation(['vehicles'])(Vehicle)
