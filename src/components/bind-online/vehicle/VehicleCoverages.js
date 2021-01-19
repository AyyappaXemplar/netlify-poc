import React, { useState, useEffect } from 'react';
import { withTranslation }            from 'react-i18next';
import { Form }                       from 'react-bootstrap'

import CustomSelect     from '../../forms/CustomSelect';
import { vehicleTitle } from '../../../services/vehicle-display';
import { policyCoverages, replacePolicyCoverages,
         replaceVehicleCoverages } from '../../../services/coverages';

function VehicleCoverages({ t, updateCoverage, vehicle }) {


  const coveragesOptions = Object.keys(policyCoverages).map(item => ({value: item, label: item}))

  // useEffect(() => {
  //   const newVehicle = replacePolicyCoverages(vehicle, policyCoveragePackage)
  //   setVehicle(newVehicle)
  // }, [policyCoveragePackage, vehicle])

  // useEffect(() => {
  //   console.log('changed')
  // }, [vehicle.coverages])


  function updateVehicleCoverages(values) {
    updateCoverage(values, vehicle.id)
  }

  return (
    <div className='mb-4 mb-sm-5'>
      <Form.Label>{vehicleTitle(vehicle)}</Form.Label>
      <CustomSelect
        options={coveragesOptions}
        placeholder="Select policy for your vehicle"
        onChange={(values) => updateVehicleCoverages(values)}
      />
    </div>
  )
}

export default withTranslation(['vehicles'])(VehicleCoverages)
