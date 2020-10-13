import React from 'react';
import { withTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import CustomSelect from '../forms/CustomSelect';
import classnames from 'classnames';

class VehicleSearch extends React.Component {
  contentRenderer({ props, state, methods }) {
    const valuesPresent = state.values.length
    const contentClass = classnames({
      'd-flex align-items-center w-100 justify-content-between': true,
      'text-med-light': !valuesPresent
    })

    return (
      <div style={{ cursor: 'pointer' }} className={contentClass}>
        { valuesPresent ?
          <>
            <span>{ state.values[0].label }</span>
            <div className='react-dropdown-select-clear'
                 onClick={() => methods.clearAll()}
                 onKeyPress={() => methods.clearAll()}>
              &times;
            </div>
          </>
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

  clearRenderer() {
    return false
  }

  render() {
    const { t, options, onClearAll, onChange, additionalProps } = this.props

    return (
      <CustomSelect
        searchable={true}
        clearable={true}
        placeholder={t('form.fields.vehicle.searchPlaceholder')}
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

export default withTranslation(['vehicles'])(VehicleSearch)
