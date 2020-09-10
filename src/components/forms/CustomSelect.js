import React from 'react'
import Select from 'react-dropdown-select'
import styled from '@emotion/styled';

// Docs for custom dropdown select are here:
// https://sanusart.github.io/react-dropdown-select/

class CustomSelect extends React.Component {
  render() {
    let { onChange, options, searchable,
          placeholder, name, value,
          handleKeyDownFn, clearable, dropdownHandle,
          contentRenderer, onClearAll,
          clearRenderer, additionalProps } = this.props;
    const values = options.filter(item => item.value === value)

    return (
      <StyledSelect
        values={values}
        searchable={searchable}
        className='mb-3'
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
      />
    )
  }
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

  span + input {
    display: none
  }

  &:focus-within {
    border-color: #197bbd;
    box-shadow: 0px 5px 10px rgba(78, 85, 82, 0.35);
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

  .react-dropdown-select-dropdown {
    position: static;
    border: 0;
    border-top: 1px solid #dfe2e0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-radius: 0px 0px 4px 4px;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    box-shadow: 0px 0px 0px;
    width: 100%
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
    color: #4E5552;
  }
`;

export default CustomSelect
