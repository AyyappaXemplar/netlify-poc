import React from 'react';
import { Nav } from 'react-bootstrap';

function CustomNavLink({ labels, actions }) {
  return (
    <Nav variant="pills" defaultActiveKey={labels[0]} className="justify-content-center p-1 rounded bg-med-light mb-4">
      <Nav.Item className="flex-grow-1">
        <Nav.Link
          onSelect={actions[0]}
          className="w-100 text-center"
          eventKey={labels[0]}>
            {labels[0]}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="flex-grow-1">
        <Nav.Link
          onSelect={actions[1]}
          className="w-100 text-center"
          eventKey={labels[1]}>
            {labels[1]}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="flex-grow-1">
        <Nav.Link
          onSelect={actions[2]}
          className="w-100 text-center"
          eventKey={labels[2]}>
            {labels[2]}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default CustomNavLink
