import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";

import DriverDetails from "./DriverDetails";
import LicenseInfo from "./LicenseInfo";
import Discounts from "./Discounts";
import SubmitButton from "../../shared/SubmitButton";

import history          from '../../../history';
import { updateDriver } from "../../../actions/drivers"
import getDate, { getTimestamp } from "../../../services/timestamps"

export default function DriverForm({ driver: driverProp, match }) {
  const [driver, setDriver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const updatingStatus = useSelector((state) => state.state.updatingDriver);
  const drivers = useSelector((state) => state.data.quote.drivers);

  // TODO: remove assigning driver from props when done with single page form
  useEffect(() => {
    let props;
    if (match) {
      props = drivers.find((driver) => driver.id === match.params.driverId);
    } else {
      props = driverProp;
    }


    const { first_name='', marital_status='' } = props
    const accident_violations = props.accident_violations || []
    const license_issued_at = getDate(props.license_issued_at)
    let defensive_driver_course_completed_at

    if (props.defensive_driver) {
      defensive_driver_course_completed_at = getDate(props.defensive_driver_course_completed_at)
    } else {
      defensive_driver_course_completed_at = '2021-12-21'
    }

    setDriver({ ...props, first_name, marital_status, accident_violations, license_issued_at,
    defensive_driver_course_completed_at })
  }, [match, drivers, driverProp])

  useEffect(() => {
    if (!match) return;

    if (updatingStatus) {
      setSubmitting(true);
    } else if (submitting && !updatingStatus) {
      history.push("/bol/quotes/drivers");
    }
  }, [updatingStatus, match, submitting]);

  // TODO: we might not need to keep the state in sync with redux when we move to the URL workflow
  // useEffect(() => { updateDriverData(driver) }, [driver])

  const updateParentState = (value, key) => setDriver( prev => ({ ...prev, [key]: value }));

  const addViolation = (violation) => setDriver((prevState) => {
    const accident_violations  = [...prevState.accident_violations, violation]
    return {...prevState, accident_violations}
  });

  const deleteViolation = (violation, index) => setDriver((prevState) => {
    const accident_violations = prevState.accident_violations.filter((item, i) => index !== i);
    return {...prevState, accident_violations}
  })


  function handleSubmit(event) {
    event.preventDefault()
    let { license_issued_at, defensive_driver_course_completed_at } = driver
    license_issued_at = getTimestamp(license_issued_at)
    defensive_driver_course_completed_at = getTimestamp(defensive_driver_course_completed_at)

    dispatch(updateDriver(driver.id, { ...driver, license_issued_at, defensive_driver_course_completed_at }))
  }

  if (!driver) {
    return false;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <DriverDetails driver={driver} updateParentState={updateParentState} />
        {driver.included_in_policy && (
          <>
            <LicenseInfo
              driver={driver}
              updateParentState={updateParentState}
              addViolation={addViolation}
              deleteViolation={deleteViolation}
            />
            <Discounts driver={driver} updateParentState={updateParentState} />
          </>
        )}
        <Row>
          <Col md={{span: 6, offset: 3}} className="d-flex justify-content-center mb-5">
            <SubmitButton text="Save Driver"/>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
