import React, { useState, useEffect }        from "react";
import { useDispatch, useSelector }          from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import DriverDetails from "./driver/DriverDetails";
import LicenseInfo   from "./driver/LicenseInfo";
import Discounts     from "./driver/Discounts";
import SubmitButton  from "../shared/SubmitButton";
import FormAlert     from "../shared/FormAlert"
import history                      from '../../history';
import { updateDriver }             from '../../actions/drivers'
import getDate, { getTimestamp }    from '../../services/timestamps'
import { getAge, formatBDayForAPI } from '../../services/driver-age'
import validateDriver               from '../../validators/bind-online/DriverForm'
import BadgeText                    from "../shared/BadgeText";
import { goodStudentAvailable }     from "../forms/DriverForm";
import { withTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import mixpanel from "../../config/mixpanel"
var CryptoJS = require("crypto-js");


function DriverForm({ driver: driverProp, match, t }) {
  const [driver, setDriver]         = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]         = useState([])
  const dispatch = useDispatch();
  const updatingStatus = useSelector((state) => state.state.updatingDriver);
  const drivers = useSelector((state) => state.data.quote.drivers);

  useEffect(() => {
    const current_driver = drivers.find((driver) => driver.id === match.params.driverId)
    const index_of_driver = drivers.indexOf(current_driver)

    mixpanel.track("Pageview", {
      "Page Title": `Driver Detailed Information (${index_of_driver + 1})`,
      "Section": "Bind Online"
    })
  }, [match.params.driverId, drivers])

  // TODO: remove assigning driver from props when done with single page form //
  useEffect(() => {
    let props;
    if (match) {
      props = drivers.find((driver) => driver.id === match.params.driverId);
    } else {
      props = driverProp;
    }

    mixpanel.identify(`${props.first_name} ${props.last_name}`);
    mixpanel.people.set({"$email":`${props.email}`})

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

    const policy_holder_relationship = props.policyholder ? 'ME' : props.policy_holder_relationship

    setDriver({ ...props, first_name, marital_status, accident_violations, license_issued_at,
    defensive_driver_course_completed_at, included_in_policy, policy_holder_relationship })
    updateForeignLicense(props.international_license)
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

  const updateParentState = (value, key) => setDriver( prev => {
    const age = getAge(value)
    const goodStudent = goodStudentAvailable({birthday: age, marital_status: prev.marital_status})

    if (key === 'marital_status' && value === 'married') {
      return { ...prev, [key]: value, good_student: false }
    } else if (key === 'birthday' && !goodStudent) {
      return { ...prev, [key]: value, good_student: false }
    } else {
      return { ...prev, [key]: value }
    }
  });

  const addViolation = (violation) => setDriver((prevState) => {
    const accident_violations  = [...prevState.accident_violations, violation]
    return {...prevState, accident_violations}
  });

  const deleteViolation = (violation, index) => setDriver((prevState) => {
    const accident_violations = prevState.accident_violations.filter((item, i) => index !== i);
    return {...prevState, accident_violations}
  })

  const formatViolations = (accident_violations) => {
    const formattedViolations = accident_violations.map((violation) => {
      const timestamp = getTimestamp(violation.date)

      return {...violation, date: timestamp}
    })
    return formattedViolations
  }

  const updateExcludeFromPolicy = (included) => {
    setDriver(prev => {
        if (prev.license_state === 'EX') {
          const license_state = null;
          return { ...prev, included_in_policy: included, license_state }
        } else {
          const license_state = !included ? 'EX' : prev.license_state;
          return { ...prev, included_in_policy: included, license_state }
        }
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
    event.preventDefault();

    let { license_issued_at,
          defensive_driver_course_completed_at,
          birthday,
          sr22_filing_date,
          accident_violations } = driver

    const validationErrors = validateDriver(driver)

    if (validationErrors) {
      setErrors(err => Object.values(validationErrors).flat())
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setErrors([])

      localStorage.setItem(`${driver.id}-enteredBirthday`, true)
      localStorage.setItem(`${driver.id}-enteredLicenseIssuedAt`, true)
      if (driver.sr22_filing_date) {
        localStorage.setItem(`${driver.id}-enteredSr22FilingDate`, true)
        sr22_filing_date = getTimestamp(sr22_filing_date)
      }

      if (driver.accident_violations) {
        accident_violations = formatViolations(driver.accident_violations)
      }

      license_issued_at = getTimestamp(license_issued_at)
      defensive_driver_course_completed_at = getTimestamp(defensive_driver_course_completed_at)

      birthday = formatBDayForAPI(birthday)

     window.localStorage.setItem("social", CryptoJS.AES.encrypt(JSON.stringify(driver.social_security), process.env.REACT_APP_SALT).toString())


      dispatch(updateDriver(driver.id, { ...driver,
                                            license_issued_at,
                                            defensive_driver_course_completed_at,
                                            birthday,
                                            sr22_filing_date,
                                            accident_violations }))
    }
  }
  const cancelSubmit = (event) => {
    event.preventDefault();
    history.push(`/bol/policy-details`)
  }

  if (!driver) {
    return false;
  }

  return (
    <Container className="pt-base">
      <Helmet>
        <title>Driver info | InsureOnline.com</title>
      </Helmet>
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
            { driver.license_status !== "not_licensed" &&
              <Discounts driver={driver} updateParentState={updateParentState} />
            }
          </>
        ) }
        <Row className="justify-content-center">
          <Col md={{span: 5}} className="d-flex justify-content-center mb-1">
            <SubmitButton text={t("form.submit")} />
          </Col>
        </Row>

        {/* <div className={"mb-5"}><CancelButton path={"/bol/policy-details"} /></div> */}
        <Row className="justify-content-center mb-5">
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <Button variant="link" className="text-med-dark text-decoration-none" onClick={(event) => cancelSubmit(event)}>{t("form.cancel")}</Button>
          </Col>
        </Row>
        <BadgeText />


      </Form>
    </Container>
  );
}


export default withTranslation(['drivers'])(DriverForm)
