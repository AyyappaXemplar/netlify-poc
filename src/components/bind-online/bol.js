import React, { useState } from 'react';
import { useSelector }     from 'react-redux';
import { Container }       from 'react-bootstrap';

import PolicyDetails from './PolicyDetails';
import Vehicle       from './Vehicle';
import Coverages     from './Coverages';
import Drivers       from  './Drivers'
export default function BOL() {
  const quote = useSelector(state => state.data.quote)
  const [display, setDisplay] = useState({ policy: true, vehicles: false, coverages: false, Drivers: false })

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
        <h2>{ display.coverages ? '-' : '+'} Coverages</h2>
      </Container>
      <div style={{display: display.coverages ? "block" : "none"}}>
        <Coverages/>
      </div>

      <Container onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, Drivers: !prevDisplay.Drivers}))}>
        <h2>{ display.Drivers ? '-' : '+'} Drivers </h2>
      </Container>
      <div style={{display: display.Drivers ? "block" : "none"}}>
        <Drivers/>
      </div>
    </>
  )
}

