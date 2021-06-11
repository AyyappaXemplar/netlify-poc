import React, { useEffect }                 from "react";
import { useSelector }         from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link }                from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import TitleRow        from '../shared/TitleRow'
import StartOverButton from '../shared/StartOverButton';
import BadgeText       from "../shared/BadgeText";
import VehicleReview   from "./vehicle/VehicleReview";
import validateVehicle from '../../validators/bind-online/VehicleForm'
import { Helmet } from 'react-helmet'
import mixpanel from "../../config/mixpanel"

const QuoteReview = ({ t }) => {
  
  useEffect(() => {
    mixpanel.track("Vehicle Details Review", { section: "Bind Online" })
  }, [])

  const vehicles = useSelector(state => state.data.quote.vehicles.map(vehicle => {
    return {...vehicle, valid: !validateVehicle(vehicle)}
  }))

  const disabledClassname = vehicles.some(driver=>!driver.valid) ? 'disabled' : ""

  return (
    <Container>
      <Helmet>
        <title>Vehicles review | InsureOnline.com</title>
      </Helmet>
      <TitleRow
        title={t("bolQuotesVehicles.title")}
        subtitle={t("bolQuotesVehicles.subtitle")}
      />

      <Row className="justify-content-center">
        <Col lg={6}>


          <label>{t("bolQuotesVehicles.vehicles")}</label>

          <div className='mb-5'>
            {vehicles.map(vehicle =>
              <VehicleReview key={`vehicle-${vehicle.id}`} vehicle={vehicle}/>
            )}
          </div>

          <p className="px-0 px-sm-3 mb-5 small text-med-dark text-center">
          <span className="d-block">{t("bolQuotesVehicles.ifYoudLikeToAdd")}</span>
            <span className="d-block">{t("bolQuotesVehicles.addAllVehs")}</span>
            <Link to="/vehicles/new" className="text-primary font-weight-bold"> {t("bolQuotesVehicles.goBackToAddVehs")} </Link>
          </p>

          <div className="w-100 w-sm-50 mx-auto m-4 my-sm-5">
            <Link className={`rounded-pill btn btn-primary btn-block btn-lg mb-3 ${disabledClassname}`}
              to={'/bol/coverages'}>{t("bolQuotesVehicles.saveAndContinue")}</Link>
            <StartOverButton/>
          </div>
        </Col>
      </Row>

      <BadgeText/>

    </Container>
  );
};

export default withTranslation(['vehicles'])(QuoteReview)
