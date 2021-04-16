import React from 'react';
// import { useState, useEffect } from 'react';
import { useSelector }           from 'react-redux';
import { withTranslation }                    from 'react-i18next';
import { Container, Col, Row, Button }        from 'react-bootstrap';
import { Link }                               from 'react-router-dom';

// import { updateCoverageForVehicles } from '../../actions/bol'
import { averageCoverageStrength }   from '../../services/rate-quality'

import TitleRow             from '../shared/TitleRow';
import StackedIcon          from '../shared/stacked_icon_lg';
import PolicyCoverages      from "./quoteReview/PolicyCoverages";
// import VehicleCoveragesForm from "./vehicle/VehicleCoveragesForm";
import Vehicle    from "../rate/Vehicle";
import BadgeText            from "../shared/BadgeText";
import FooterContent        from "../shared/FooterContent"


function CoveragesReview({ t, match, history }) {
  const quote = useSelector(state => state.data.quote)

  const coverageStrength = averageCoverageStrength(quote)

  // we will need this when we are updating deductibles
  // const updatingVehicles = useSelector(redux => redux.bol.status);
  // const dispatch                = useDispatch()
  // const [vehicles, setVehicles] = useState(quote.vehicles)
  // const [submitting, setSubmitting]     = useState(false)

  // useEffect(() => {
  //   if (updatingVehicles) {
  //     setSubmitting(true);
  //   } else if (submitting && !updatingVehicles) {
  //     history.push("/bol/questions/edit");
  //   }
  // }, [updatingVehicles, submitting, history]);

  const content = t(`coverages.${coverageStrength}`)

  const renderCoverageContent = (coverage) => {

    return (
      <div className="w-100 d-flex mb-3 pt-4">
        <StackedIcon strength={coverageStrength}/>
        <div className="ml-3">
          <p className="m-0"><strong>{coverage.header}&nbsp;</strong></p>
          Coverage applies to all drivers and vehicles on your policy
        </div>
      </div>
    )
  }

  return (
    <Container className="pt-base">
      <TitleRow title={"Review your coverage."} subtitle={"You can review your Basic Coverage option below. "} />

      <Row className="d-flex flex-column justify-content-center align-items-center">
        <Col lg={6}>
          <PolicyCoverages quote={quote} strength={coverageStrength} >
            {renderCoverageContent(content)}
          </PolicyCoverages>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={6} className="justify-content-center">
          <div className='mb-5'>
            {quote.vehicles.map(vehicle =>
              <Vehicle vehicle={vehicle} displayCoverageSelector={false} key={vehicle.id}
                excludePolicyCoverages={true} fullInfo={false}
                isBolQuotesRates={true} displayPremiums={false}/>
              // we will need this when we are updating deductibles
              // <VehicleCoveragesForm key={`vehicle-${vehicle.id}`} vehicle={vehicle}
              //   setVehicles={setVehicles}/>
            )}
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col sm={5} className="d-flex justify-content-center mb-5 flex-column">
          {
           // we will need this when we are updating deductibles
           //<Button className="rounded-pill my-3" size='lg' variant="primary" block */}
           //  disabled={false} onClick={()=> dispatch(updateCoverageForVehicles(quote.vehicles) )}> */}
           //   Save and Continue */}
           // </Button>
          }
           <Link
              className={'rounded-pill btn btn-primary btn-block btn-lg mb-3'}
              to={`/bol/questions/edit`}
            >
              Save and Continue
            </Link>
        <Button variant="link" className="text-med-dark text-decoration-none"> Cancel and Return</Button>
        </Col>
        <BadgeText />
      </Row>

      <FooterContent/>

    </Container>
  )
}

export default withTranslation(['vehicles'])(CoveragesReview)
