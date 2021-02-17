import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";

import DriverDetails from "./driver/DriverDetails";
import LicenseInfo   from "./driver/LicenseInfo";
import Discounts     from "./driver/Discounts";
import SubmitButton  from "../shared/SubmitButton";
import FormAlert     from "../shared/FormAlert"

import history                   from '../../history';
import { updateDriver }          from '../../actions/drivers'
import getDate, { getTimestamp } from '../../services/timestamps'
import validateDriver            from '../../validators/bind-online/DriverForm'
import CancelButton              from "../shared/CancelButton";
import BadgeText from "../shared/BadgeText";

export default function DriverForm({ driver: driverProp, match }) {
  const [driver, setDriver]         = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]         = useState([])
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
    const included_in_policy = props.policyholder ? true : props.included_in_policy

    let defensive_driver_course_completed_at
    if (props.defensive_driver) {
      defensive_driver_course_completed_at = getDate(props.defensive_driver_course_completed_at)
    } else {
      defensive_driver_course_completed_at = '2021-12-21'
    }

    setDriver({ ...props, first_name, marital_status, accident_violations, license_issued_at,
    defensive_driver_course_completed_at, included_in_policy })
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

  const updateExcludeFromPolicy = (included) => {
    setDriver(prev =>  {
      const license_state = !included ? 'EX' :prev.license_state
      return { ...prev, included_in_policy: included, license_state }
    })
  }

  const updateForeignLicense = (foreign) => {
    setDriver(prev =>  {
      const license_status = foreign ? 'active' : prev.license_status
      const license_number = foreign ? '' : prev.license_number
      const license_state  = foreign ? 'IT' : prev.license_state
      const license_issued_at  = foreign ? '' : prev.license_issued_at
      return { ...prev, international_license: foreign, license_status, license_number,
               license_state, license_issued_at }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    let { license_issued_at, defensive_driver_course_completed_at } = driver

    const validationErrors = validateDriver(driver)
    if (validationErrors) {
      setErrors(err => Object.values(validationErrors).flat())
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setErrors([])

      license_issued_at = getTimestamp(license_issued_at)
      defensive_driver_course_completed_at = getTimestamp(defensive_driver_course_completed_at)

      dispatch(updateDriver(driver.id, { ...driver, license_issued_at, defensive_driver_course_completed_at }))
    }
  }

  if (!driver) {
    return false;
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3}}>
          { !!errors.length && errors.map((err, index) =>
            <FormAlert key={`error-${index}`} text={err}/>
          )}
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <DriverDetails driver={driver} updateParentState={updateParentState}
          updateExcludeFromPolicy={updateExcludeFromPolicy}/>
        { driver.included_in_policy && (
          <>
            <LicenseInfo
              driver={driver}
              updateParentState={updateParentState}
              updateForeignLicense={updateForeignLicense}
              addViolation={addViolation}
              deleteViolation={deleteViolation}
            />
            <Discounts driver={driver} updateParentState={updateParentState} />
          </>
        ) }
        <Row className="justify-content-center">
          <Col md={{span: 5}} className="d-flex justify-content-center mb-1">
            <SubmitButton text="Save Driver" />
          </Col>
        </Row>
  
        <div className={"mb-5"}><CancelButton path={"/bol/policy-details"} /></div>
        <div className={"mb-5"}><BadgeText /></div>
        

      </Form>
    </Container>
  );
}
