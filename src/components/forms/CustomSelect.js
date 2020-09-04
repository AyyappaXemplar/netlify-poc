import React from 'react'
import Select from 'react-dropdown-select'
import styled from '@emotion/styled';

class CustomSelect extends React.Component {
  render() {
    let { onChange, options, searchable, placeholder, name, handleKeyDownFn, value } = this.props;
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
      />
    )
  }
}

// handleKeyDownFn={handleKeyDownFn}

const StyledSelect = styled(Select)`
  padding: 1rem;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #fff;

  span + input {
    display: none
  }

  &:focus-within {
    border-color: #197bbd;
    box-shadow: 0 0 0 2px rgba(25,123,189,0.15);
  }

  .react-dropdown-select-content {
    span {
      color: #4E5552;
    }
  }

  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #4E5552;
  }

  .react-dropdown-select-item {
    color: #333;
    border: 1px solid #f2f5f5
  }
  .react-dropdown-select-input {
    font-size: 1rem;
  }

  .react-dropdown-select-dropdown {
    position: absolute;
    left: 0;
    border: 1px solid #197bbd;;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    box-shadow: none;
  }

  .react-dropdown-select-item {
    color: #4E5552;
    padding: 1rem;
  }

  .react-dropdown-select-item {
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
