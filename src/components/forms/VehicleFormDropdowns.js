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

    return t('form.fields.vehicle.fields').map((item, index) => {
      let options = this.props.options[item.name]
      let values = options.filter(option => {
        let name = this.props.vehicle[item.name]
        return option.name === name
      })
      let sortBy = item.name === "year" ? 'null' : 'name';
      let onChange = (values) => this.props.onChange(item.name, values)

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
          wrapperClassName="mb-3"
          searchBy={'name'}
          searchable={true}
          // clearable={true}
        />
      )}
    )
  }
}

export default withTranslation(['vehicles'])(VehicleFormDropdown)
