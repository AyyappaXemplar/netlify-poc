import React from 'react';
import CustomSelect from '../forms/CustomSelect';
import { withTranslation } from 'react-i18next';


class VehicleFormDropdown extends React.Component {
  render() {
    const { t } = this.props

    return t('fields.vehicle.fields').map((item, index) => {
      let options = this.props.options[item.name]
      let values = options.filter(option => {
        let name = this.props.vehicle[item.name]
        return option.name === name
      })
      let onChange = (values) => this.props.onChange(item.name, values)

      return(
        <CustomSelect
          searchable={false}
          values={values}
          sortBy={'name'}
          placeholder={item.label}
          name={item.name}
          key={item.name}
          options={options}
          onChange={onChange.bind(this)}
          valueField={'name'}
          labelField={'name'}
        />
      )}
    )
  }
}

export default withTranslation(['vehiclesNew'])(VehicleFormDropdown)
