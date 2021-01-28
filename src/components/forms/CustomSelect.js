import React from 'react'
import Select from 'react-dropdown-select'
import styled from '@emotion/styled';

// Docs for custom dropdown select are here:
// https://sanusart.github.io/react-dropdown-select/

function CustomSelect({ onChange, options, searchable,
          placeholder, name, values,
          handleKeyDownFn, clearable, dropdownHandle,
          contentRenderer, onClearAll,
          clearRenderer, additionalProps, searchBy,
          valueField, labelField, sortBy, noDataRenderer, wrapperClassNames,
          noDataLabel, searchFn, className }) {

  return (
    <div className={wrapperClassNames}>
      <StyledSelect
        sortBy={sortBy}
        searchBy={searchBy}
        values={values}
        searchable={searchable}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        options={options}
        clearable={clearable}
        handleKeyDownFn={handleKeyDownFn}
        additionalProps={additionalProps}
        dropdownHandle={dropdownHandle}
        contentRenderer={contentRenderer}
        onClearAll={onClearAll}
        clearRenderer={clearRenderer}
        valueField={valueField}
        labelField={labelField}
        noDataLabel={noDataLabel}
        noDataRenderer={noDataRenderer}
        searchFn={searchFn}
        className={className}
      />
    </div>
  )
}


const StyledSelect = styled(Select)`
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-weight: 300;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: static;
  transition: box-shadow 0.15s ease-in-out;
  position: relative;

  &.small {
    min-width: 55px;

    .react-dropdown-select-content {
      padding: 0.5rem;
    }

    .react-dropdown-select-dropdown-handle {
      display:none;
    }
  }

  span + input {
    display: none
  }

  &:focus-within {
    border-color: #197bbd;
    box-shadow: 0px 5px 10px rgba(78, 85, 82, 0.35);
  }

  .react-dropdown-select {
    position: relative;
  }

  .react-dropdown-select-content {
    padding: 1rem;
    width: 100%;
    span {
      color: #4E5552;
    }
  }

  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    font-size: 20px;

  }
  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    position: absolute;
    right: 0;
    margin-right: 1rem;
    top: 16px;
  }

  .react-dropdown-select-item {
    color: #333;
    border: 1px solid #f2f5f5
  }

  .react-dropdown-select-input {
    font-size: 1rem;
    border: none;
    margin-left: 5px;
    background: transparent;

    :focus {
      outline: none
    }
  }

  > .react-dropdown-select-dropdown {
    border: 1px solid #197bbd;
    border-top-color: #dfe2e0;
    border-radius: 0 0 4px 4px;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-radius: 0px 0px 4px 4px;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    width: calc(100% + 2px);
    top: 56px;
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.2)
  }

  .react-dropdown-select-item {
    color: #4E5552;
    padding: 1rem;
  }

  .react-dropdown-select-item {
    border: 0;

    :nth-of-type(even) {
      background: #f2f5f5;
      &:hover {
        background: rgba(0,116,217,0.1);
      }
    }
  }

  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    background: #dbeefa;
    border-bottom: 0;
    color: #4E5552;
  }

  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #777;
    color: #ccc;
  }

  .react-dropdown-select-no-data {
    padding: 1rem;
    color: #4E5552;
  }
`;

export default CustomSelect
