import React, { useState, useEffect,
                useReducer }        from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation }          from 'react-i18next';
import { Container, Row, Col,
                         Form, Button }     from 'react-bootstrap'

import history                 from '../../history';
import { updatePolicyVehicle } from '../../actions/bol';

import Lienholder    from './vehicle/Lienholder'
import SubmitButton  from "../shared/SubmitButton"
import FormAlert     from "../shared/FormAlert"
import FormContainer from '../shared/FormContainer';
import Radio         from '../forms/Radio';
import VehicleCard   from '../../components/bind-online/vehicle/VehicleCard'
import VehicleReviewVinModal from './vehicle/VehicleReviewVinModal';

import validateVehicle from '../../validators/bind-online/VehicleForm'

const defaultLienholder = {
  name: '',
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip_code: ''
  }
}

function initVehicle(vehicle) {
  const { manufacturer, model, year, trim, id, use_code,
          current_mileage = 0, estimated_annual_distance = 0, tnc=false, individual_delivery=false,
          logo_url, vin='' } = vehicle

  let lienholder = vehicle.lienholder || defaultLienholder
  lienholder = { name: lienholder.name, address: lienholder.address}

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

function VehicleForm({ t, vehicle: vehicleProp, match }) {
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors]         = useState([])
  const dispatch                    = useDispatch()
  const updatingStatus = useSelector(state => state.state.updatingVehicle)
  const vehicles = useSelector(state => state.data.quote.vehicles)
  const [showVinModalState, updateVinModalState] = useState(false)

  const findVehicle = () => {
    let props
    if (match) {
      props = vehicles.find(item => item.id === match.params.vehicleId)
    } else {
      props = vehicleProp
    }
    return props
  }
  const [vehicle, localDispatch]    = useReducer(vehicleReducer, findVehicle(), initVehicle)
  const [lienholder, setLienholder] = useState(!!vehicle.lienholder?.name)

  useEffect(() => {
    if (!match) return

    if (updatingStatus) {
      setSubmitting(true)
    } else if (submitting && !updatingStatus) {
      history.push('/bol/quotes/vehicles')
    }
  }, [updatingStatus, match, submitting])

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

  const lienholderOptions = [
    {value: true,  label: 'yes'},
    {value: false, label: 'no'}
  ]

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
    if (!lienholder) delete vehicleParams.lienholder;

    const validationErrors = validateVehicle(vehicleParams, { showLienholder: lienholder })

    if (validationErrors) {
      setErrors(err => Object.values(validationErrors).flat())
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setErrors([])
      dispatch(updatePolicyVehicle(vehicle.id, vehicleParams))
    }
  }

  const cancelSubmit = (event) => {
    event.preventDefault();
    history.push(`/bol/quotes/drivers`)
}

  return (
    <Container>
      <FormContainer bootstrapProperties={{lg:6}}>
        <Form onSubmit={handleSubmit}>
          { !!errors.length && errors.map((err, index) =>
            <FormAlert key={`error-${index}`} text={err}/>
          )}

          <div className='mb-4 mb-sm-5'>
            <Form.Label>What's the VIN Number?&nbsp;(<Button variant="link" className="p-0 orange" onClick={()=>updateVinModalState(true)}>Where to find your VIN

</Button>)</Form.Label>
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
              value={vehicle.current_mileage ? vehicle.current_mileage : ""}
              onChange={(event) => updateVehicle(event, 'current_mileage') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>Vehicle Mileage/Yr</Form.Label>
            <Form.Control
              className="font-weight-light"
              type="number"
              placeholder={'10,000/Yr'}
              value={vehicle.estimated_annual_distance ? vehicle.estimated_annual_distance : ""}
              onChange={(event) => updateVehicle(event, 'estimated_annual_distance') }
            />
          </div>

          <div className="mb-4 mb-sm-5">
            <Form.Label>Lienholder</Form.Label>
            <Row className="mb-3">
              { lienholderOptions.map(item =>
                <Col xs={12} sm={6} key={`lienholder-${item.value}`}>
                  <Radio
                    key={`lienholder-${item.label}`}
                    type='radio'
                    label={item.label}
                    value={item.value}
                    selected={lienholder === item.value}
                    onChange={() => setLienholder(item.value)}
                  />
                </Col>
              )}
            </Row>
            { lienholder && <Lienholder lienholder={vehicle.lienholder} dispatch={localDispatch}/> }
          </div>

          <div className='w-100 w-sm-75 mx-auto mb-1'>
            <SubmitButton text='Save and Continue'/>
          </div>
          <Row className="justify-content-center">
            <Col xs={12} md={5} className="d-flex justify-content-center">
              <Button variant="link" className={"text-dark"} onClick={(event)=>cancelSubmit(event)}> <u>Cancel and Return</u></Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
      <VehicleReviewVinModal showVinModalState={showVinModalState} updateShowVinModalState={updateVinModalState}/>
    </Container>
  )
}

export default withTranslation(['vehicles'])(VehicleForm)
