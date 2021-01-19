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

function init(vehicleProps) {
  const { manufacturer, model, year, trim, lienholder,
  use_code, mileage='', year_mileage='', tnc=false, individual_delivery=false } = vehicleProps
  return {
    manufacturer, model, year, trim, lienholder, use_code, mileage, year_mileage,
    tnc, individual_delivery
  }
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

      if (newVehicle.tnc || newVehicle.individual_delivery ) {
        if (newVehicle.use_code !== "business") {
          newVehicle.use_code = "business"
        }
      } else if (!newVehicle.tnc && !newVehicle.individual_delivery ) {
        newVehicle.use_code = null;
      }
      return { ...newVehicle }
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
    dispatch(updatePolicyVehicle(vehicle.id, vehicle))
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{md: 6}}>
        <h3 onClick={() => setDisplayVehicle(!displayVehicle)}>
          { displayVehicle ? '-' : '+'} {vehicleTitle(vehicle)}
        </h3>
        <Form style={{display: displayVehicle ? "block" : "none"}} onSubmit={handleSubmit}>
          <div className='mb-4 mb-sm-5'>

            <Form.Label>{t('form.fields.vehicle.label')}</Form.Label>
            <VehicleSearch
              onChange={ (vehicleProps) => {
                localDispatch({type: 'updateVehicle', payload: vehicleProps })}
              }
            />
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
              value={vehicle.mileage}
              onChange={(event) => updateVehicle(event, 'mileage') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>Vehicle Mileage/Yr</Form.Label>
            <Form.Control
              className="font-weight-light"
              type="number"
              placeholder={'10,000/Yr'}
              value={vehicle.year_mileage}
              onChange={(event) => updateVehicle(event, 'year_mileage') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Lienholder initialLienholder={vehicle.lienholder}/>
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
