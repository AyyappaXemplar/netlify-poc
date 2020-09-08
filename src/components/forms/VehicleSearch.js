import React from 'react';
import { withTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import CustomSelect from '../forms/CustomSelect';
import Axios from 'axios';
import classnames from 'classnames';

class VehicleSeach extends React.Component {
  setVehicleSearchOption() {
    const url = `${this.apiBaseUrl}/${this.apiNamespace}/vehicles`

    Axios.get(url)
     .then(response => {
      let options = response.data.data
      const vehicleSearchOption = options.map(option => ({ label: `${option.year} ${option.make} ${option.model} ${option.trim}`, value: option.id, vehicle: option }))
      this.setState({ vehicleSearchOption })
     })
  }

  contentRenderer({ props, state, methods }) {
    const valuesPresent = state.values.length
    const contentClass = classnames({
      'react-dropdown-select-content': true,
      'text-med-light': !valuesPresent
    })

    return (
      <div style={{ cursor: 'pointer' }} className={contentClass}>
        { valuesPresent ?
          state.values[0].label
          :
          <React.Fragment>
            <SearchIcon className='color-med-light mr-3'/>
            <input onKeyUp={props.additionalProps.handleKeyUpFn}
                   placeholder={props.placeholder}
                   className='react-dropdown-select-input'
                   size={methods.getInputSize()}/>
          </React.Fragment>
        }
      </div>
    )
  }

  onClearAll() {
    this.setState({ options: [] })
  }

  clearRenderer({ props, state, methods }) {
    if (state.values.length === 0) return false
    return (
      <div className='react-dropdown-select-clear'
           onClick={() => methods.clearAll()}
           onKeyPress={() => methods.clearAll()}>
        &times;
      </div>
    )
  }

  render() {
    const { t, options, onClearAll, onChange, additionalProps } = this.props

    return (
      <CustomSelect
        searchable={true}
        clearable={true}
        placeholder={t('fields.vehicle.searchPlaceholder')}
        name='vehicle-search'
        options={options}
        onChange={onChange}
        dropdownHandle={false}
        onClearAll={onClearAll}
        contentRenderer={this.contentRenderer}
        clearRenderer={this.clearRenderer}
        additionalProps={additionalProps}
      />

    );
  }
}

export default withTranslation(['vehiclesNew', 'common'])(VehicleSeach)
