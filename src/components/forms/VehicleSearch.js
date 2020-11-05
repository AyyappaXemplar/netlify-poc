import React from 'react';
import { withTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import CustomSelect from '../forms/CustomSelect';
import classnames from 'classnames';

function customNoDataRenderer({props, state, methods}) {
  return(
    <div className="react-dropdown-select-dropdown react-dropdown-select-dropdown-position-bottom">
      <div className="react-dropdown-select-no-data">
        { !!state.search.length ?
          <span>Searching for <strong>{state.search}</strong></span> :
          state.search
        }
      </div>
    </div>
  )
}

function contentRenderer({ props, state, methods }) {
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
          <div
            className='react-dropdown-select-clear'
            onClick={() => methods.clearAll()}
            onKeyPress={() => methods.clearAll()}
            value={state.search}
          >
            &times;
          </div>
        </>
        :
        <>
          <SearchIcon className='color-med-light mr-2'/>
          <input
            onKeyUp={props.additionalProps.handleKeyUpFn}
            onChange={methods.setSearch}
            placeholder={props.placeholder}
            className='react-dropdown-select-input flex-grow-1'
            size={methods.getInputSize()}
          />
        </>
      }
    </div>
  )
}

function VehicleSearch({ t, options, onClearAll, onChange, additionalProps }) {
  const clearRenderer = () => false

  return (
    <CustomSelect
      searchable={true}
      clearable={true}
      placeholder={t('form.fields.vehicle.searchPlaceholder')}
      options={options}
      onChange={onChange}
      dropdownHandle={false}
      onClearAll={onClearAll}
      contentRenderer={contentRenderer}
      clearRenderer={clearRenderer}
      additionalProps={additionalProps}
      noDataRenderer={customNoDataRenderer}
    />
  );
}

export default withTranslation(['vehicles'])(VehicleSearch)
