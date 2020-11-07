import React                       from 'react';
import { withTranslation }         from 'react-i18next';
import { Container, Form, Button } from 'react-bootstrap';

import FormContainer         from '../shared/FormContainer';
import BadgeText             from '../shared/BadgeText';
import Radio                 from '../forms/Radio';
import VehicleSearch         from './VehicleSearch';
import VehicleFormDropdowns  from './VehicleFormDropdowns';

import history               from '../../history';
import vehicleOptions        from '../../services/vehicle-options';
import VehicleOptionsApi     from '../../services/vehicle-api';
import * as VehicleConstants from '../../constants/vehicle'

class VehicleForm extends React.Component {
  constructor(props) {
    super(props)
    const showVehicleSearch = true && props.allowVehicleSearch
    this.state = { vehicle: this.props.vehicle, options: vehicleOptions, optionsReady: true, vehicleSearchOptions: [], showVehicleSearch }
  }

  componentDidMount() {
    const newVehicle = this.vehicleValuesPresent()
    if (newVehicle && !this.state.showVehicleSearch) {
      this.setState({ optionsReady: false}, this.initOptions)
    }
  }

  initOptions() {
    this.setManufacturerOption()
      .then(() => this.setModelOptions())
      .then(() => this.setTrimOptions())
      .then(() => this.setState({optionsReady: true }))
  }

  onDropdownChange(vehicleProperty, selectedOptions) {
    const option = selectedOptions[0]
    // the change needs to come from a user selection
    if (!option) return

    const callbacks = {
      year: this.setManufacturerOption, manufacturer: this.setModelOptions,
      model: this.setTrimOptions
    }
    const vehicleDropdownProperties = this.props.t('form.fields.vehicle.fields').map(item => item.name)
    const changedPropertyIndex = vehicleDropdownProperties.indexOf(vehicleProperty)
    const propertiesToClear = vehicleDropdownProperties.slice(changedPropertyIndex + 1)
    const { vehicle } = this.state

    vehicle[vehicleProperty] = option.name
    if (vehicleProperty === 'trim') vehicle.vin = option.vin
    if (vehicleProperty === 'manufacturer') vehicle.logo_url = option.logo

    propertiesToClear.forEach(property => vehicle[property] = null)
    const callback = callbacks[vehicleProperty]
    this.setState({ vehicle }, callback)
  }

  useCodeChange(value) {
    const { vehicle } = this.state
    vehicle.use_code = value
    this.setState({ vehicle })
  }

  tncUsageChange(item) {
    const { vehicle } = this.state
    vehicle[item.name] = !vehicle[item.name]
    this.setState({ vehicle })
  }

  setManufacturerOption() {
    return VehicleOptionsApi.manufacturer(this.state)
      .then(response => {
        let { options } = this.state
        options = { ...options, manufacturer: response.data }
        this.setState({ options })
      })
  }

  setModelOptions() {
    if (!this.state.options.manufacturer.length) return

    return VehicleOptionsApi.model(this.state)
      .then(response => {
        let options = { ...this.state.options }
        options = { ...options, model: response.data }
        this.setState({ options })
      })
  }

  setTrimOptions() {
    if (!this.state.options.manufacturer.length) return

    VehicleOptionsApi.trim(this.state)
      .then(response => {
        let { options } = this.state
        options = { ...options, trim: response.data }
        this.setState({ options })
      })
  }

  setVehicleFromSearch(values) {
    if (values[0]) {
      const vehicleFromSearch = values[0].vehicle
      const { use_code } = this.state.vehicle
      let vehicle = { ...this.state.vehicle, ...vehicleFromSearch, use_code }
      this.setState({ vehicle })
    }
  }

  setVehicleSearchOptions(event) {
    const query = event.target.value
    if (query.length < VehicleConstants.MIN_SEARCH_CHARS) return;

    VehicleOptionsApi.search(query)
     .then(response => {
      const vehicleSearchOptions = response.map((option, index) => ({
        label: `${option.year} ${option.manufacturer} ${option.model} ${option.trim}`,
        value: index,
        vehicle: option
      }))
      this.setState({ vehicleSearchOptions })
     })
  }

  clearSearchOptions() { this.setState({ vehicleSearchOptions: [] }) }

  useCodeRadios() {
    const { t } = this.props

    return t('form.fields.use.useCodevalues').map((item, index) => {
      let label = t(`form.fields.use.useCode.${item}.label`)
      let value = t(`form.fields.use.useCode.${item}.value`).toLowerCase()
      let onChange = () => this.useCodeChange(value)

      return (
        <Radio
          type={'radio'} id={`info-car-${value}`}
          label={label}
          value={value}
          key={index}
          selected={this.state.vehicle.use_code === value}
          onChange={onChange}
        />
      )
    })
  }

  tncUseCheckBoxes() {
    return this.props.t('form.fields.tncUsage.attributes').map(item => {
      let onChange = () => this.tncUsageChange(item)

      return(
        <Radio
          key={item.name}
          type='checkbox'
          label={item.label}
          value={this.state.vehicle[item.name]}
          selected={this.state.vehicle[item.name]}
          onChange={onChange}
        />
      )
    })
  }


  cancelSubmit(event) {
    event.preventDefault()
    history.push(this.props.returnPath || '/quotes/vehicles');
  }

  vehicleValuesPresent() {
    const { vehicle } = this.state
    return VehicleConstants.PRESENT_FIELDS
      .map(field => vehicle[field])
      .every(property => property)
  }

  enableSubmit() {
    const { vehicle } = this.state
    const objectPresent = !!Object.keys(vehicle).length

    return objectPresent && this.vehicleValuesPresent()
  }

  render() {
    const { t, title, handleSubmit, avoidCancel } = this.props
    const enabled = this.enableSubmit()
    const cancelSubmit = this.cancelSubmit.bind(this)
    const onSubmit = (event) => handleSubmit(event, this.state.vehicle)
    const useCodeRadios = this.useCodeRadios()
    const tncUseCheckBoxes = this.tncUseCheckBoxes()
    const toggleVehicleSearch = () =>this.setState({ showVehicleSearch: !this.state.showVehicleSearch })
    const toggletext = (event) => this.state.showVehicleSearch ? "Select by year, make, and model" : "Autocomplete Search"

    return (
      <Container>
        <FormContainer bootstrapProperties={{md: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

            <div className='mb-5'>
              <Form.Label>{t('form.fields.vehicle.label')}</Form.Label>
              { this.state.showVehicleSearch ?
                <VehicleSearch
                  options={this.state.vehicleSearchOptions}
                  onChange={this.setVehicleFromSearch.bind(this)}
                  additionalProps={{ handleKeyUpFn: this.setVehicleSearchOptions.bind(this) }}
                  onClearAll={this.clearSearchOptions.bind(this)}
                /> :
                <VehicleFormDropdowns
                  options={this.state.options}
                  vehicle={this.state.vehicle}
                  onChange={this.onDropdownChange.bind(this)}
                  ready={this.state.optionsReady}
                />
              }
              { this.props.allowVehicleSearch &&
                <Button onClick={toggleVehicleSearch} variant='link' className='p-0 text-primary'><u>{toggletext()}</u></Button>
              }
            </div>

            <Form.Label>{t('form.fields.use.label')}</Form.Label>
            <div className='mb-5'>
              {useCodeRadios}
            </div>

            <div className="mb-5">
              <Form.Label>{t('form.fields.tncUsage.label')}</Form.Label>
              {tncUseCheckBoxes}
              <small className="form-text text-muted">{t('form.fields.tncUsage.smallText')}</small>
            </div>

            <div className='w-75 mx-auto d-flex flex-column align-items-center'>
              <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('form.submit')}
              </Button>

              {
                !avoidCancel &&
                <Button onClick={cancelSubmit} variant='link' className='text-med-dark'>
                  <u>{t('form.cancel')}</u>
                </Button>
              }
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </Container>
    );
  }
}

export default withTranslation(['vehicles'])(VehicleForm)
