import React from 'react'
import Select from 'react-dropdown-select'
import styled from '@emotion/styled';
import classnames from 'classnames'

// Docs for custom dropdown select are here:
// https://sanusart.github.io/react-dropdown-select/

class CustomSelect extends React.Component {
  itemRenderer(option, props, methods) {
    if (!props.keepSelectedInList && methods.isSelected(option)) return null;

    const itemClassNames = classnames({
      'react-dropdown-select-item': true,
      'react-dropdown-select-item-selected': methods.isSelected(option),
      'react-dropdown-select-item-disabled': option.disabled
    })

    return option.disabled ? (
      <div key={option[props.valueField]} className={itemClassNames}>{option.label}</div>
    ) : (
      <div key={option[props.valueField]} className={itemClassNames} onClick={option.disabled ? null : () => methods.addItem(option)}>{option[props.labelField]}</div>
    )
  }

  // Use this function to customize the dropdown content.
  // It customized the dropdown items also with the function above
  // need to pass `dropdownRenderer={this.customDropdownRenderer}` to StyledSelect.
  customDropdownRenderer({ props, state, methods }) {
    const regexp = new RegExp(state.search, 'i');
    const option = props.options.filter((item) => regexp.test(item[props.searchBy] || item[props.labelField]))

    return (
      <div>
        { option.map(option => this.itemRenderer(option, props, methods)) }
      </div>
    )
  }

  render() {
    let { onChange, options, searchable, placeholder, name, value } = this.props;
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
        // itemRenderer={this.itemRenderer}
        // dropdownRenderer={this.customDropdownRenderer}

      />
    )
  }
}


const StyledSelect = styled(Select)`
  padding: 1rem;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-weight: 300;

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
