import React, { useState } from 'react';
import { useSelector, useDispatch }     from 'react-redux';
import { Container, Row, Col, Alert, Button }   from 'react-bootstrap';
import history from "./../../history"

import PolicyDetails from './PolicyDetails';
import Vehicle       from './Vehicle';
import Coverages     from './Coverages';
import Drivers       from './Drivers';

import {rateQuote} from '../../actions/rates';


export default function BOL() {
  const quote     = useSelector(state => state.data.quote)
  const bolStatus = useSelector(state => state.bol.status)
  const [display, setDisplay] = useState({ policy: false, vehicles: false, coverages: false })
  const dispatch = useDispatch();

  const submitQuote = async() => {
    await dispatch(rateQuote())
    // dummy push
    await history.push("/bol-review")
    
  }
  return (
    <>
      <Container onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, policy: !prevDisplay.policy}))}>
        { bolStatus &&
          <Row className="position-fixed" style={{top: 0, left: '50%', width: '250px', marginLeft: '-125px'}}>
            <Col>
              <div className='d-flex justify-content-center'>
                <Alert variant="light" className='shadow text-dark'>
                  <span>{bolStatus}</span>
                </Alert>
              </div>
            </Col>
          </Row>
        }

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

      <Container>
        <Row style={{display:"flex",justifyContent:"center", margin:'25px'}}>
          <Col xs={6} style={{display:"flex",justifyContent:"center", margin:'25px'}}>
            <Button style={{width:"80%"}} onClick={submitQuote} className={"rounded-pill"}>Get a Quote</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

