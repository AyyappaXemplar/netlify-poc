import React, { useState, useEffect }         from 'react';
import { useSelector, useDispatch }           from 'react-redux';
import { withTranslation }                    from 'react-i18next';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';

import { updateCoverageForVehicles }    from '../../actions/bol'

import TitleRow                         from '../shared/TitleRow';
import icon                             from "../../images/stacked_icon_lg.svg";
import PolicyCoverages                  from "./quoteReview/PolicyCoverages";
import VehicleCoveragesForm             from "./vehicle/VehicleCoveragesForm";
import BadgeText                        from "../shared/BadgeText";
import FooterContent                    from "../shared/FooterContent"

function CoveragesReview({ t, match, history }) {
  const quote = useSelector(state => state.data.quote)
  const updatingVehicles = useSelector(redux => redux.bol.status);
  const dispatch                = useDispatch()
  const [vehicles, setVehicles] = useState(quote.vehicles)
  const [submitting, setSubmitting]     = useState(false)

  useEffect(() => {
    if (updatingVehicles) {
      setSubmitting(true);
    } else if (submitting && !updatingVehicles) {
      history.push("/bol/quotes/questions");
    }
  }, [updatingVehicles, submitting, history]);

  return (
    <Container>
      <TitleRow title={"Review your coverage."} subtitle={"You can review your Basic Coverage option below. "} />

      <Row className="d-flex flex-column justify-content-center align-items-center">
        <Col lg={6}>
          <PolicyCoverages quote={quote}>
            <div className="w-100 d-flex mb-3 pt-4">
              <Image src={icon} />
              <div className="ml-3">
                <p className="m-0"><strong>Basic Coverage&nbsp;</strong><button style={{color:"#F16322"}} type="button" className="p-0 btn btn-link">(Edit Coverage)</button></p>
                <p className="m-0">Coverage applies to all drivers and vehicles on your policy</p>
              </div>
            </div>
          </PolicyCoverages>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col sm={6} className="justify-content-center">
          <div className='mb-5'>
            {vehicles.map(vehicle =>
              <VehicleCoveragesForm key={`vehicle-${vehicle.id}`} vehicle={vehicle}
                setVehicles={setVehicles}/>
            )}
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col sm={5} className="d-flex justify-content-center mb-5 flex-column">
          <Button className="rounded-pill my-3" size='lg' variant="primary" block
            disabled={false} onClick={()=> dispatch(updateCoverageForVehicles(vehicles) )}>
             Save and Continue
          </Button>
        <button type="button" className="btn btn-link mx-auto"> Cancel and Return</button>
        </Col>
        <BadgeText />
      </Row>

      <FooterContent/>

    </Container>
  )
}

export default withTranslation(['vehicles'])(CoveragesReview)
