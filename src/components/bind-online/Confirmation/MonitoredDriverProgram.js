import React                          from 'react';

import { Row, Col, Image } from 'react-bootstrap';

import piggybankIcon                  from "../../../images/piggyBank.svg";
import handShakeIcon                  from "../../../images/handshake.svg";
import carIcon                        from "../../../images/car.svg";

function MonitoredDriverProgram() {
  return (
    <Row className="justify-content-center">

      <Col lg={6} className={"bg-white rounded shadow py-5 px-5"}>
        <h3 className="my-4">Monitored Driver Program Details</h3>
        <Row>
          <div md={2} classNmae="pr-1"><Image src={handShakeIcon} /></div>
          <Col><p className="mb-1"><strong>Enroll</strong></p>
          <p>Enrolling allows us to collect information about your driving habits (via a mobile app). Sign up and earn a discount on your first policy term. <span className="font-weight-bold">To download the mobile app, Search for “USIC” to locate the “Road Ranger Monitored Driver App.</span></p></Col>
        </Row>
        <Row>
          <div md={2} classNmae="pr-1"><Image src={carIcon} /></div>
          <Col><p className="mb-1"><strong>Drive</strong></p>
          <p>Hard braking, time of day and how much you drive are some of the driving habits Snapshot will monitor. If you’re using the mobile app, in some states, in-hand phone use while driving will also be monitored.</p></Col>
        </Row>
        <Row>
          <div md={2} classNmae="pr-1"><Image src={piggybankIcon} /></div>
          <Col><p className="mb-1"><strong>Form your rate</strong></p>
          <p>You can keep track of your driving online or through the app. The safer you drive, the more you could save. Drive with Snapshot for just six months and you’re done! Your future renewal rates are now based on the driving habits you shared</p></Col>
        </Row>
      </Col>
      </Row>
  )
}

export default MonitoredDriverProgram


