import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import FormContainer from '../shared/FormContainer';
import BadgeText from '../shared/BadgeText';
import CustomSelect from '../forms/CustomSelect';
import VehicleSearch from '../forms/VehicleSearch';
import Radio from '../forms/Radio';
import vehicleOptions from '../../services/vehicle-options';
import VehicleOptionsApi from '../../services/vehicle-api';
import * as VehicleConstants from '../../constants/vehicle'

class VehicleForm extends React.Component {
  constructor(props) {
    super(props)
    const showVehicleSearch = process.env.REACT_APP_VEHICLE_AUTOCOMPLETE_SEARCH === 'true' && props.allowVehicleSearch
    this.state = { vehicle: this.props.vehicle, options: vehicleOptions, vehicleSearchOptions: [], showVehicleSearch }
  }

  componentDidMount() {
    const newVehicle = this.vehicleValuesPresent()
    if (newVehicle && !this.state.showVehicleSearch) {
      this.initOptions()
    }
  }

  yearChange(element, other) {
    const year = element[0].value
    const { vehicle } = this.state
    vehicle.year = year

    this.setState({ vehicle }, ()=> this.setManufacturerOption())
  }

  manufacturerChange(element) {
    if (element[0]) {
      const { vehicle } = this.state
      vehicle.manufacturer = element[0].value.name
      this.setState({ vehicle }, ()=> this.setModelOptions())
    } else {
      this.setModelOptions()
    }
  }

  modelChange(element) {
    if (element[0]) {
      const { vehicle } = this.state
      vehicle.model = element[0].value.name
      this.setState({ vehicle }, ()=> this.setTrimOptions())
    } else {
      this.setTrimOptions()
    }
  }

  trimChange(element) {
    if (element[0]) {
      const { vehicle } = this.state
      vehicle.trim = element[0].value.name
      this.setState({ vehicle })
    }
  }

  useCodeChange(value) {
    const { vehicle } = this.state
    vehicle.use_code = value
    this.setState({ vehicle })
  }

  initOptions() {
    this.setManufacturerOption()
      .then(() => this.setModelOptions())
      .then(() => this.setTrimOptions())
      .then(() => this.setState({optionsReady: true }))
  }

  setManufacturerOption() {
    return VehicleOptionsApi.manufacturer(this.state)
      .then(response => {
        const makes = response.data;
        let options = { ...this.state.options }

        const manufacturers = makes.map(make => ({ label: make.name, value: make }) )
        options.manufacturer = manufacturers
        this.setState({ options })
      })
  }

  setModelOptions() {
    if (!this.state.options.manufacturer.length) return

    return VehicleOptionsApi.model(this.state)
      .then(response => {
        let options = { ...this.state.options }
        const models = response.data.map(model => ({ label: model.name, value: model }) )
        options.model = models
        this.setState({ options })
      })
  }

  setTrimOptions() {
    if (!this.state.options.manufacturer.length) return

    VehicleOptionsApi.trim(this.state)
      .then(response => {
        let options = { ...this.state.options }
        const trims = response.data.map(trim => ({ label: trim.name, value: trim }) )
        options.trim = trims
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

  clearOptions() { this.setState({ vehicleSearchOptions: [] }) }

  useCodeRadios() {
    const { t } = this.props

    return t('fields.use.useCodevalues').map((item, index) => {
      let label = t(`fields.use.useCode.${item}.label`)
      let value = t(`fields.use.useCode.${item}.value`)
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

  vehicleFieldDropdowns() {

    const { t } = this.props

    return t('fields.vehicle.fields').map((item, index) => {
      if (!this.state.options[item.name].length) return false

      let values = this.state.options[item.name].filter(option => {
        let value = this.state.vehicle[item.name]
        return option.value.name === value
      })

      return(
        <CustomSelect
          searchable={false}
          values={values}
          placeholder={item.label}
          name={item.name}
          key={item.name}
          options={this.state.options[item.name]}
          onChange={this[`${item.name}Change`].bind(this)}
        />
      )}
    )
  }

  vehicleSearch() {
    const additionalProps = { handleKeyUpFn: this.setVehicleSearchOptions.bind(this) }

    return <VehicleSearch
      options={this.state.vehicleSearchOptions}
      onChange={this.setVehicleFromSearch.bind(this)}
      additionalProps={additionalProps}
      onClearAll={this.clearOptions.bind(this)}
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
    const vehicleFieldDropdowns = this.vehicleFieldDropdowns()
    const vehicleSearch = this.vehicleSearch()

    return (
      <>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

            <div className='mb-5'>
              <Form.Label>{t('fields.vehicle.label')}</Form.Label>
              { this.state.showVehicleSearch ? vehicleSearch : vehicleFieldDropdowns }
            </div>

            <Form.Label>{t('fields.use.label')}</Form.Label>
            <div className='mb-5'>
              {useCodeRadios}
            </div>
            <div className='w-75 mx-auto d-flex flex-column align-items-center'>
              <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('submit')}
              </Button>
              <Button onClick={cancelSubmit} variant='link' className='text-med-dark'><u>{t('cancel')}</u></Button>
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </>
    );
  }
}

export default withTranslation(['vehiclesNew'])(VehicleForm)
