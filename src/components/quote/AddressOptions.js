import React               from 'react';
import { withTranslation } from 'react-i18next';
import { Form }            from 'react-bootstrap';

import CustomSelect  from '../forms/CustomSelect';

function AddressOptions({ t, addressOptions, onChange }) {
  const dropdownAddressOptions = () => {
    return addressOptions.map((option, index) => {
      return {
        label: `${option.city} (${option.county})`,
        value: option,
        index
      }
    })
  }

  return (
    <>
      <Form.Label>{t('new.form.city.label')}</Form.Label>
      <CustomSelect
        valueField={'index'}
        placeholder={'Select your city'}
        options={dropdownAddressOptions()}
        onChange={onChange}
      />
    </>
  )
}
export default withTranslation(['quotes'])(AddressOptions)
