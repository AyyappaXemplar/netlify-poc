import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch }     from 'react-redux';
import { Container, Row, Col, Alert, Button }   from 'react-bootstrap';
import history from "./../../history"

import PolicyDetails from './PolicyDetails';
import VehicleForm   from './VehicleForm';
import Coverages     from './Coverages';
import Drivers       from './Drivers';

import { vehicleTitle }   from '../../services/vehicle-display';
import { rateFinalQuote } from '../../actions/rates';

export default function BOL() {
  const quote       = useSelector(state => state.data.quote)
  const bolStatus   = useSelector(state => state.bol.status)
  const ratingQuote = useSelector(state => state.state.ratingQuote)
  const [formSubmited, setFormSumbmitted] = useState(false)

  const [vehicleDisplay, setVehicleDisplay] = useState([])
  const toggleVehicle = index => {
    setVehicleDisplay(prev => {
      let newAry = [...prev]
      newAry[index] = !newAry[index]
      return newAry
    })
  }

  useEffect(() => { setVehicleDisplay(Array(quote.vehicles.length).fill(false)) }, [quote.vehicles.length])

  const [display, setDisplay] = useState({ policy: true, vehicles: false, coverages: false, Drivers: false })
  const dispatch = useDispatch();

  useEffect(() => {
    if (formSubmited && !ratingQuote) history.push("/bol/rate")
  }, [formSubmited, ratingQuote])

  const submitQuote = () => {
    setFormSumbmitted(true)
    dispatch(rateFinalQuote())
  }

  return (
    <>
      <Container>
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

        <h5
          onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, policy: !prevDisplay.policy}))}
          className="mb-3">
          { display.policy ? '-' : '+'} Policy Details
        </h5>
        <div style={{display: display.policy ? "block" : "none"}}><PolicyDetails/></div>

        <h5
          onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, vehicles: !prevDisplay.vehicles}))}
          className="mb-3">
          { display.vehicles ? '-' : '+'} Vehicles
        </h5>
        <div style={{display: display.vehicles ? "block" : "none"}}>
          { quote.vehicles.map((vehicle, index) =>
            <div key={`vehicle-${vehicle.id}`}>
              <Row>
                <Col md={{span: 10, offset: 1}}>
                  <h5 onClick={() => toggleVehicle(index)}>
                    { vehicleDisplay[index] ? '-' : '+'} {vehicleTitle(vehicle)}
                  </h5>
                </Col>
              </Row>
              <div style={{display: vehicleDisplay[index] ? "block" : "none"}}>
                <VehicleForm vehicle={vehicle}/>
              </div>
            </div>
          )}
        </div>

        <h5
          onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, coverages: !prevDisplay.coverages}))}
          className="mb-3">
          { display.coverages ? '-' : '+'} Coverages
        </h5>
        <div style={{display: display.coverages ? "block" : "none"}}>
          <Coverages/>
        </div>

        <h5
          onClick={() => setDisplay(prevDisplay=> ({...prevDisplay, Drivers: !prevDisplay.Drivers}))}
          className="mb-3">
          { display.Drivers ? '-' : '+'} Drivers
        </h5>
        <div style={{display: display.Drivers ? "block" : "none"}}>
          <Drivers/>
        </div>

        <Row style={{display:"flex",justifyContent:"center", margin:'25px'}}>
          <Col xs={6} style={{display:"flex",justifyContent:"center", margin:'25px'}}>
            <Button style={{width:"80%"}} onClick={submitQuote} className={"rounded-pill"}>
              { ratingQuote ?  (
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : 'Get a Quote'
              }
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

