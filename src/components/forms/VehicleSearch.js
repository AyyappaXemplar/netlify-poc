import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import classnames          from 'classnames';

import * as VehicleConstants from '../../constants/vehicle'
import VehicleOptionsApi     from '../../services/vehicle-api';

import { ReactComponent as SearchIcon } from '../../images/search.svg';
import CustomSelect                     from '../forms/CustomSelect';

function customNoDataRenderer({ props, state, methods }) {
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

function VehicleSearch({ t, onClearAll, additionalProps, onChange, searchByVin }) { //options, onChange,
  const searchFn = ({ state, methods }) => methods.sortBy()
  const [options, setOptions] = useState([])
  const [values, setValues] = useState([])

  const setVehicleFromSearch = (selectedOptions) => {
    if (selectedOptions[0]) {
      onChange(selectedOptions[0].vehicle)
      setValues(selectedOptions[0].vehicle)
    }
  }

  const setVehicleSearchOptions = (event) => {
    const query = event.target.value
    if (query.length < VehicleConstants.MIN_SEARCH_CHARS) return;

    const searchParamName = searchByVin ? "vin" : "query"
    VehicleOptionsApi.search(query, searchParamName)
     .then(response => {
      const vehicleSearchOptions = response.map((option, index) => ({
        label: `${option.year} ${option.manufacturer} ${option.model} ${option.trim}`,
        value: index,
        vehicle: option
      }))
      setOptions(vehicleSearchOptions)
    })
  }

  const clearSearchOptions = () => setOptions([])
  
  useEffect(() => {
    clearSearchOptions()
    setValues([])
  },
    [searchByVin]
  )

  return (
    <CustomSelect
      searchable={true}
      clearable={false}
      placeholder={searchByVin ? t('form.fields.vehicle.vinSearchPlaceholder') : t('form.fields.vehicle.searchPlaceholder')}
      options={options}
      onChange={setVehicleFromSearch}
      dropdownHandle={false}
      onClearAll={clearSearchOptions}
      contentRenderer={contentRenderer}
      additionalProps={{ handleKeyUpFn: setVehicleSearchOptions }}
      noDataRenderer={customNoDataRenderer}
      wrapperClassNames="mb-2"
      searchFn={searchFn}
      values={values}
    />
  );
}

export default withTranslation(['vehicles'])(VehicleSearch)
