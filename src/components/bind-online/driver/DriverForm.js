import React, { useState, useEffect }  from "react";
import { useDispatch, useSelector }    from "react-redux"
import { Container, Row, Col, Button } from "react-bootstrap";

import DriverDetails from "./DriverDetails";
import LicenseInfo   from "./LicenseInfo"
import Discounts     from "./Discounts"

import { updateDriver } from "../../../actions/drivers"

export default function DriverForm({ driver: driverProp, match }) {
  const [driver, setDriver] = useState(false);
  const dispatch  = useDispatch();
  const drivers   = useSelector(state => state.data.quote.drivers)


  useEffect(() => {
    let props
    if (match) {
      props = drivers.find(driver => driver.id === match.paramsdriverId)
    } else {
      props = driverProp
    }
    const { marital_status='' } = props
    setDriver({ ...props, marital_status })
  }, [match, drivers, driverProp])

  // TODO: we might not need to keep the state in sync with redux when we move to the URL workflow
  // useEffect(() => { updateDriverData(driver) }, [driver])


  const updateParentState = (value, key) => setDriver(prev => ({ ...prev, [key]: value }))
  const dispatchDriver = () => dispatch(updateDriver(driver.id ,driver))

  const addViolation = (violation) => {
    setDriver((prevState) => {
      let violations = [...prevState.violations, violation]
      return { ...prevState, violations }
    });
  }

  return (
    <>
      <DriverDetails driver={driver} updateParentState={updateParentState}/>
      {/* <LicenseInfo driver={driver} updateParentState={updateParentState} addViolation={addViolation}/> */}
      <Discounts driver={driver} updateParentState={updateParentState} />
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button className="rounded-pill my-3" variant="primary" onClick={dispatchDriver}>Save Driver</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
