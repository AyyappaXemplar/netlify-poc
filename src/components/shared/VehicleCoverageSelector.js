import React from 'react';
import { Nav } from 'react-bootstrap';

function VehicleCoverageSelector({ labels, actions, coveragesReady }) {

  return (
    <Nav variant="pills" defaultActiveKey={labels[0]} className="justify-content-center p-1 rounded bg-med-light mb-4">
      { [0, 1, 2].map(nav => (
        <Nav.Item className="flex-grow-1" key={labels[nav]}>
          <Nav.Link
            disabled={!coveragesReady}
            onSelect={actions[nav]}
            className={`w-100 text-center ${coveragesReady ? '' : 'text-medium'}`}
            eventKey={labels[nav]}>
              {labels[nav]}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default VehicleCoverageSelector

