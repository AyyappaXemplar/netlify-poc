import React               from 'react';
import { withTranslation } from 'react-i18next';
import { Form }            from 'react-bootstrap'

import CustomSelect        from '../../forms/CustomSelect';
import { policyCoverages } from '../../../services/coverages';

function VehicleCoverages({ t, updateCoverage, vehicle }) {
  const coveragesOptions = Object.keys(policyCoverages).map(item => ({value: item, label: item}))

  return (
    <div className='mb-4 mb-sm-5'>
      <Form.Label>{vehicle.displayTitle}</Form.Label>
      <CustomSelect
        options={coveragesOptions}
        placeholder="Select policy for your vehicle"
        onChange={(values) => updateCoverage(values, vehicle.id)}
      />
    </div>
  )
}

export default withTranslation(['vehicles'])(VehicleCoverages)
