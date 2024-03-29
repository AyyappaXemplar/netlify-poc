import React from 'react';
import CustomSelect from '../forms/CustomSelect';
import { withTranslation } from 'react-i18next';

class VehicleFormDropdown extends React.Component {
  render() {
    const { t, ready } = this.props

    if (!ready) {
      return (
        <div className="spinner-border spinner-border-sm text-med-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    }

    return t('form.fields.vehicle.fields').map(item => {

      const options = this.props.options[item.name]
      const name = this.props.vehicle[item.name]
      const values = name ? [{label: this.props.vehicle[item.name], name: this.props.vehicle[item.name]}] : options.filter(option => option.name === name)

      const sortBy = item.name === "year" ? 'null' : 'name';
      const onChange = (values) => this.props.onChange(item.name, values)

      return(
        <CustomSelect
          values={values}
          sortBy={sortBy}
          placeholder={item.label}
          name={item.name}
          key={item.name}
          options={options}
          onChange={onChange.bind(this)}
          valueField={'id'}
          labelField={'name'}
          wrapperClassNames="mb-3"
          searchBy={'name'}
          searchable={true}
          // clearable={true}
        />
      )}
    )
  }
}

export default withTranslation(['vehicles'])(VehicleFormDropdown)
