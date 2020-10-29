import React from 'react';
import { Nav } from 'react-bootstrap';

function VehicleCoverageSelector({ actions, coveragesReady, activeKey }) {
  const labels=["Basic", "Full", "Comprehensive"]

  const COVERAGE_PACKAGE_MAPPINGS = {
    LIABILITY: labels[0],
    GOOD: labels[1],
    BETTER: labels[2]
  }


  return (
    <Nav variant="pills" activeKey={COVERAGE_PACKAGE_MAPPINGS[activeKey]} className="justify-content-center p-1 rounded bg-med-light mb-4">
      { labels.map((label, index) => (
        <Nav.Item className="flex-1" key={label}>
          <Nav.Link
            disabled={!coveragesReady}
            onSelect={actions[index]}
            className={`w-100 text-center ${coveragesReady ? '' : 'text-medium'}`}
            eventKey={label}>
              {label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default VehicleCoverageSelector

