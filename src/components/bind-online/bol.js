import React, { useState } from 'react';
import { useSelector }     from 'react-redux';
import { Container }       from 'react-bootstrap';

import PolicyDetails from './PolicyDetails';
import Vehicle       from './Vehicle';
import Coverages     from './Coverages';

export default function BOL() {
  const quote = useSelector(state => state.data.quote)
  const [display, setDisplay] = useState({ policy: false, vehicles: false, coverages: true })

  return (
    <>
      <Container onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, policy: !prevDisplay.policy}))}>
        <h2>{ display.policy ? '-' : '+'} Policy Details</h2>
      </Container>
      <div style={{display: display.policy ? "block" : "none"}}><PolicyDetails/></div>

      <Container onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, vehicles: !prevDisplay.vehicles}))}>
        <h2>{ display.vehicles ? '-' : '+'} Vehicles</h2>
      </Container>
      <div style={{display: display.vehicles ? "block" : "none"}}>
        { quote.vehicles.map(vehicle =>
          <Vehicle vehicle={vehicle} key={`vehicle-${vehicle.id}`}/>
        )}
      </div>

      <Container onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, coverages: !prevDisplay.coverages}))}>
        <h2>{ display.coverages ? '-' : '+'} Policy Details</h2>
      </Container>
      <div style={{display: display.coverages ? "block" : "none"}}>
        <Coverages/>
      </div>
    </>
  )
}

