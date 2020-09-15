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

class VehicleForm extends React.Component {
  MIN_SEARCH_CHARS = 4

  constructor(props) {
    super(props)
    const showVehicleSearch = process.env.REACT_APP_VEHICLE_AUTOCOMPLETE_SEARCH === 'true' && props.allowVehicleSearch
    this.state = { vehicle: this.props.vehicle, options: vehicleOptions, vehicleSearchOptions: [], showVehicleSearch }
  }

  componentDidMount() {
    const newVehicle = Object.values(this.state.vehicle).every(item => item)
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
      vehicle.manufacturer = element[0].value
      this.setState({ vehicle }, ()=> this.setModelOption())
    } else {
      this.setModelOption()
    }
  }

  modelChange(element) {
    if (element[0]) {
      const { vehicle } = this.state
      vehicle.model = element[0].value
      this.setState({ vehicle }, ()=> this.setTrimOptions())
    } else {
      this.setTrimOptions()
    }
  }

  trimChange(element) {
    if (element[0]) {
      const { vehicle } = this.state
      vehicle.trim = element[0].value
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
    this.setModelOption()
    this.setTrimOptions()
  }

  setManufacturerOption() {
    VehicleOptionsApi.manufacturer(this.state.vehicle.year)
      .then(response => {
        const { makes } = response.data;
        let options = { ...this.state.options }
        const manufacturer = makes.map(item => ({ label: item.name, value: item.name }) )
        options.manufacturer = manufacturer
        this.setState({ options })
      })
  }

  setModelOption() {
    VehicleOptionsApi.model(this.state.vehicle.year, this.state.vehicle.manufacturer)
      .then(response => {
        let options = { ...this.state.options }
        const models = response.data.map(item => ({ label: item.name, value: item.name }) )
        options.model = models
        this.setState({ options })
      })
  }

  setTrimOptions() {
    VehicleOptionsApi.trim()
      .then(response => {
        let options = { ...this.state.options }
        const trims = response.data.map(item => ({ label: item.trim, value: item.id }) )
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
    if (query.length < this.MIN_SEARCH_CHARS) return;

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

    return t('fields.vehicle.fields').map((item, index) =>
      <CustomSelect
        searchable={false}
        value={this.state.vehicle[item.name]}
        placeholder={item.label}
        name={item.name}
        key={item.name}
        options={this.state.options[item.name]}
        onChange={this[`${item.name}Change`].bind(this)}
      />
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

  enableSubmit() {
    const { vehicle } = this.state
    const valuesPresent = Object.values(vehicle).every(property => property)
    const objectPresent = !!Object.keys(vehicle).length

    return objectPresent && valuesPresent
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
