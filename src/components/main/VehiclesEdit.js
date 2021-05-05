import React, { useState, useEffect } from 'react'
import { withTranslation }            from 'react-i18next'
import { useSelector, useDispatch }   from 'react-redux'
import { updateVehicle }  from '../../actions/vehicles'
import { setAlert }  from '../../actions/state'

import history     from '../../history';
import VehicleForm from '../forms/VehicleForm';

function VehiclesEdit({ match, t, location }) {
  const [requestTriggered,
         setRequestTriggered] = useState(false)
  const [vehicle, setVehicle] = useState(false)
  const dispatch        = useDispatch()
  const data            = useSelector(state => state.data)
  const updatingVehicle = useSelector(state => state.state.updatingVehicle)

  useEffect(() => {
    const vehicleId = match.params.vehicleId
    const vehicle = data.quote.vehicles.find(vehicle => vehicle.id === vehicleId)
    setVehicle(vehicle)
    // setVehicle({ manufacturer: "Chevrolet", model: "Sonic", trim: "LT Hatchback", use_code: "commuting", year: "2012" })
  }, [data, match])

  useEffect(() => {

    if (requestTriggered && !updatingVehicle) {
      const successUrl = match.path === '/vehicles/:vehicleId/edit' ? '/quotes/vehicles' : '/quotes/review'
      window.scrollTo({ top: 0, behavior: "smooth" });
      dispatch(setAlert({variant: 'success', text:  'Successfully updated your vehicle'}))
      history.push(successUrl)
    }
  }, [requestTriggered, updatingVehicle, dispatch, match])

  const handleSubmit = (event, vehicle) => {
    event.preventDefault()
    setRequestTriggered(true)
    dispatch(updateVehicle(vehicle.id, vehicle))
  }

  const getReturnPath = () => {
    let returnPath

    if (location.state?.prevPath === '/rates') {
      returnPath = '/rates'
    } else if (data.rates.length) {
      returnPath = '/quotes/review'
    } else {
      returnPath = '/quotes/vehicles'
    }

    return returnPath
  }

  if (!vehicle) return false

  return (
    <VehicleForm
      handleSubmit={handleSubmit}
      title={t('edit.title')}
      vehicle={vehicle}
      returnPath={getReturnPath()}
      allowVehicleSearch={true}
    />
  );
}

export default withTranslation(['vehicles'])(VehiclesEdit)