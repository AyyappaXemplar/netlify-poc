import React from 'react'
import { Container, Row, Col, Image }      from 'react-bootstrap'

export default function VehicleCard({ vehicle }) {
  return (
    <Container className="vehicleCard shadow-sm" style={{padding:"10px"}}>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Image className="" src={vehicle.logo_url} width={"60px"} height={ "60px" }/>
        </Col>
        <Col className={"flex-column justify-content-center align-items-center"} md={9}>
          <div><strong>{vehicle.year}{" "}{vehicle.manufacturer}{" "}{vehicle.model}</strong></div>
          <div>{ vehicle.trim}</div>

        </Col>
      </Row>
      </Container>
      )
}
