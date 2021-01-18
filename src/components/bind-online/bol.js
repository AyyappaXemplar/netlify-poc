import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PolicyDetails from './PolicyDetails';
import Vehicle from './Vehicle';
import { Container } from 'react-bootstrap';

export default function BOL() {
  const quote = useSelector(state => state.data.quote)
  const [display, setDisplay] = useState({ policy: true, vehicles: true })

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
            <Vehicle vehicle={vehicle}/>
        )}
      </div>
    </>
  )
}

