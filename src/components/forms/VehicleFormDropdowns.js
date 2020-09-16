import React from 'react';
import CustomSelect from '../forms/CustomSelect';
import vehicleOptions from '../../services/vehicle-options';
import { withTranslation } from 'react-i18next';


class VehicleFormDropdown extends React.Component {
  render() {
    const { t } = this.props

    return t('fields.vehicle.fields').map((item, index) => {
      let options = this.props.options[item.name]
      let values = options.filter(option => {
        let value = this.props.vehicle[item.name]
        return option.value.name === value
      })
      let onChange = (values) => this.props.onChange(item.name, values)

      return(
        <CustomSelect
          key={`vehicle-select-${index}`}
          searchable={false}
          values={values}
          placeholder={item.label}
          name={item.name}
          key={item.name}
          options={options}
          onChange={onChange.bind(this)}
          valueField={'value.name'}
        />
      )}
    )
  }
}

export default withTranslation(['vehiclesNew'])(VehicleFormDropdown)
