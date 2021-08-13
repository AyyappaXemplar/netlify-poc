import React, { useEffect }     from "react";
import { useSelector }          from "react-redux";
import { Container, Row, Col }  from "react-bootstrap";
import { Link }                 from 'react-router-dom'
import TitleRow                 from '../shared/TitleRow'
import StartOverButton          from '../shared/StartOverButton';
import BadgeText                from "../shared/BadgeText";
import Drivers                  from './quoteReview/Drivers';
import validateDriver           from '../../validators/bind-online/DriverForm'
import { Helmet }               from 'react-helmet'
import { withTranslation }      from 'react-i18next';
import mixpanel                 from "../../config/mixpanel";

const QuoteDrivers = ({ t }) => {

  useEffect(() => {
    mixpanel.track("Pageview", {
      "Page Title": "Review All Driver Details",
      "Section": "Bind Online"
    });
  }, [])

  const quote = useSelector(state => state.data.quote)
  const vehicleId = quote.vehicles[0].id
  const validatedDrivers = quote.drivers.map((driverObj, index) => {
    return { ...driverObj, isValid: !validateDriver(driverObj), index }
  });

  const disabledClassname = validatedDrivers.some(driver=>!driver.isValid) ? 'disabled' : ""

  if (quote.drivers.length) mixpanel.people.set(`${quote.drivers[0].first_name} ${quote.drivers[0].last_name}`)

  return (
    <Container>
      <Helmet>
        <title>Drivers review | InsureOnline.com</title>
      </Helmet>
      <TitleRow
        title={ t('reviewDriversTitle') }
        subtitle={t('reviewDriversSubtext')}
        colClassNames="mt-3 pt-3"
      />

      <Row className="justify-content-center">
        <Col lg={6}>

          <Drivers drivers={validatedDrivers}/>

          <p className="px-0 px-sm-3 mb-5 small text-med-dark text-center">
            {t("footerNote.copy")}
            {/* Note: You must add everyone in your household that is 15 years or older, regardless if they are licensed/excluded. */}
            <Link to={t("footerNote.link.path")} className="text-primary font-weight-bold">{ " " }{ t("footerNote.link.text") }</Link>
          </p>


          <div className="w-100 w-sm-50 mx-auto my-4 my-sm-5">

            <Link className={`rounded-pill btn btn-primary btn-block btn-lg mb-3 ${disabledClassname}`} to={`/bol/vehicles/${vehicleId}/edit`}>{ t("form.submit") }</Link>

            <StartOverButton/>
          </div>
        </Col>
      </Row>

      <BadgeText/>

    </Container>
  );
};

export default withTranslation(['drivers'])(QuoteDrivers)
