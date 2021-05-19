import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { Nav }                        from 'react-bootstrap'

import { coveragePackages }       from '../../constants/vehicle'
import { updateVehicleCoverages } from '../../actions/vehicles'
import { withTranslation }     from 'react-i18next'

function VehicleCoverageSelector({ vehicle, t }) {
  const LABELS=[t("coverages.Basic"), t("coverages.Better"), t("coverages.Enhanced")]

  const COVERAGE_PACKAGE_MAPPINGS = {
    LIABILITY: LABELS[0],
    GOOD:      LABELS[1],
    BETTER:    LABELS[2]
  }

  const [selectedCoverage, setSelectedCoverage] = useState(vehicle.coverage_package_name)
  const updatingVehicleCoverage = useSelector(state => state.state.updatingVehicleCoverage)
  const dispatch = useDispatch()

  useEffect(() => {
    if (updatingVehicleCoverage) return
    if (selectedCoverage !== vehicle.coverage_package_name) {
      dispatch(updateVehicleCoverages(vehicle, selectedCoverage))
    }
  }, [dispatch, vehicle, selectedCoverage, updatingVehicleCoverage])

  const handleSelect = (eventKey) => setSelectedCoverage(eventKey)

  const navLinkLabelDisplay = (coverage) => {
    let label = COVERAGE_PACKAGE_MAPPINGS[coverage]
    if (coverage !== selectedCoverage) return label

    return updatingVehicleCoverage ?
      <div className="spinner-border spinner-border-sm text-med-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      :
      label
  }

  return (
    <Nav variant="pills"
      activeKey={selectedCoverage}
      className="justify-content-center p-1 rounded bg-med-light mb-4"
      onSelect={handleSelect}
    >
      { Object.values(coveragePackages).map((coverage, index) => (
        <Nav.Item className="flex-1" key={coverage} >
          <Nav.Link
            disabled={updatingVehicleCoverage}
            onSelect={() => setSelectedCoverage(coverage)}
            className={`w-100 text-center ${updatingVehicleCoverage ? 'text-medium' : ''}`}
            eventKey={coverage}>
            {navLinkLabelDisplay(coverage)}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default withTranslation(["rates"])(VehicleCoverageSelector)

