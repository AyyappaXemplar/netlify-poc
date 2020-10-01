import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import FormContainer from '../shared/FormContainer';
import BadgeText from '../shared/BadgeText';
import VehicleSearch from './VehicleSearch';
import VehicleFormDropdowns from './VehicleFormDropdowns';
import Radio from '../forms/Radio';
import vehicleOptions from '../../services/vehicle-options';
import VehicleOptionsApi from '../../services/vehicle-api';
import * as VehicleConstants from '../../constants/vehicle'

class VehicleForm extends React.Component {
  constructor(props) {
    super(props)
    const showVehicleSearch = process.env.REACT_APP_VEHICLE_AUTOCOMPLETE_SEARCH === 'true' && props.allowVehicleSearch
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
    // the change comes from a user selection
    if (option) {
      const callbacks = {
        year: this.setManufacturerOption, manufacturer: this.setModelOptions,
        model: this.setTrimOptions
      }
      const { vehicle } = this.state
      const callback = callbacks[vehicleProperty]

      vehicle[vehicleProperty] = option.name
      this.setState({ vehicle }, callback)
    }
  }

  useCodeChange(value) {
    const { vehicle } = this.state
    vehicle.use_code = value
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

  vehicleFormDropdowns() {
    return (
      <VehicleFormDropdowns
        options={this.state.options}
        vehicle={this.state.vehicle}
        onChange={this.onDropdownChange.bind(this)}
      />
    )
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
      let value = t(`form.fields.use.useCode.${item}.value`)
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

  vehicleSearch() {
    const additionalProps = { handleKeyUpFn: this.setVehicleSearchOptions.bind(this) }

    return <VehicleSearch
      options={this.state.vehicleSearchOptions}
      onChange={this.setVehicleFromSearch.bind(this)}
      additionalProps={additionalProps}
      onClearAll={this.clearSearchOptions.bind(this)}
    />
  }

  cancelSubmit(event) {
    event.preventDefault()
    this.props.history.goBack();
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
    const { t, title, handleSubmit } = this.props
    const enabled = this.enableSubmit()
    const cancelSubmit = this.cancelSubmit.bind(this)
    const onSubmit = (event) => handleSubmit(event, this.state.vehicle)
    const useCodeRadios = this.useCodeRadios()
    const vehicleSearch = this.vehicleSearch()
    const vehicleFormDropdowns = this.vehicleFormDropdowns()

    return (
      <>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

            <div className='mb-5'>
              <Form.Label>{t('form.fields.vehicle.label')}</Form.Label>
              { this.state.showVehicleSearch ? vehicleSearch : vehicleFormDropdowns }
            </div>

            <Form.Label>{t('form.fields.use.label')}</Form.Label>
            <div className='mb-5'>
              {useCodeRadios}
            </div>
            <div className='w-75 mx-auto d-flex flex-column align-items-center'>
              <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('form.submit')}
              </Button>
              <Button onClick={cancelSubmit} variant='link' className='text-med-dark'><u>{t('form.cancel')}</u></Button>
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </>
    );
  }
}

export default withTranslation(['vehicles'])(VehicleForm)
