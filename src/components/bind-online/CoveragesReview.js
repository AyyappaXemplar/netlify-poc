import React, { useState, useEffect }   from 'react';
import { useSelector }                  from 'react-redux';
import { withTranslation }              from 'react-i18next';
import { Container, Col, Row, Image }   from 'react-bootstrap';

import SubmitButton                     from '../shared/SubmitButton';

import history                          from '../../history';

import TitleRow                         from '../shared/TitleRow';
import icon                             from "../../images/stacked_icon_lg.svg";
import PolicyCoverages                  from "./quoteReview/PolicyCoverages";
import Vehicles                         from "./quoteReview/Vehicles";
import BadgeText                        from "../shared/BadgeText";
import FooterContent                    from "../shared/FooterContent"

function Coverages({ t, match }) {

  const allCars = useSelector((state) => state.data.quote.vehicles )

  const quote = useSelector(state => state.data.quote)
  const bolStatus = useSelector(state => state.bol.status)

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!match) return
    const updatingStatus = bolStatus === 'Updating vehicle coverages'

    if (updatingStatus) {
      setSubmitting(true)
    } else if (submitting && !updatingStatus) {
      history.push('/bol/questions')
    }
  }, [bolStatus, match, submitting])

  return (
    <Container>
      <TitleRow title={"Review your coverage."} subtitle={"You can review your Basic Coverage option below. "} />
    
      <Row className="d-flex flex-column justify-content-center align-items-center">
      <Col lg={6} className={"d-flex row"}>
          <div className="bg-white p-4 w-100 shadow rounded d-flex">
          <Image src={icon} />
          <div className="ml-3">
            <p className="m-0"><strong>Basic Coverage&nbsp;</strong><button style={{color:"#F16322"}} type="button" className="p-0 btn btn-link">(Edit Coverage)</button></p>
            <p className="m-0">Coverage applies to all drivers and vehicles on your policy</p>
            </div>
            </div>
      </Col>
        <Col lg={6} className={"d-flex flex-column justify-content-start align-items-center"}>
          <PolicyCoverages quote={quote} showEybrowUi={false} />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col sm={6} className="justify-content-center">
          <Vehicles vehicles={allCars} displayCoverageSelector={false} forceShowEditUi={true} hideEyebrowText={true}/>
        </Col>
      </Row>

          
      <Row className="justify-content-center mb-5">
        <Col sm={5} className="d-flex justify-content-center mb-5 flex-column">
          <SubmitButton text="Save & continue" />
          <button type="button" className="btn btn-link mx-auto"> Cancel and Return</button>
        </Col>
        <BadgeText />
      </Row>

      <FooterContent/>
      
    </Container>
  )
}

export default withTranslation(['vehicles'])(Coverages)
