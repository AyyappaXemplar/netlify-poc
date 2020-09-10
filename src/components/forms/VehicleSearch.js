import React from 'react';
import { withTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import CustomSelect from '../forms/CustomSelect';
import classnames from 'classnames';

class VehicleSeach extends React.Component {
  contentRenderer({ props, state, methods }) {
    const valuesPresent = state.values.length
    const contentClass = classnames({
      'react-dropdown-select-content d-flex w-100': true,
      'text-med-light': !valuesPresent
    })

    return (
      <div style={{ cursor: 'pointer' }} className={contentClass}>
        { valuesPresent ?
          state.values[0].label
          :
          <>
            <SearchIcon className='color-med-light mr-3'/>
            <input onKeyUp={props.additionalProps.handleKeyUpFn}
                   placeholder={props.placeholder}
                   className='react-dropdown-select-input flex-grow-1'
                   size={methods.getInputSize()}/>
          </>
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
