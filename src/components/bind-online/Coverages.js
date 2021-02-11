import React, { useState, useEffect }   from 'react';
import { useSelector, useDispatch }     from 'react-redux';
import { withTranslation }              from 'react-i18next';
import { Container, Col, Row, Form, Image }              from 'react-bootstrap'

import CustomSelect    from '../forms/CustomSelect'
import SubmitButton    from '../shared/SubmitButton'
import FormContainer   from '../shared/FormContainer'
import VehicleCoverage from './vehicle/VehicleCoverages'

import { vehicleTitle }              from '../../services/vehicle-display';
import history                       from '../../history';
import { updateCoverageForVehicles } from '../../actions/bol'
import { arrayUpdateItemById }       from '../../utilities/array-utilities';
import { policyCoverages, replacePolicyCoverages,
                          replaceVehicleCoverages } from '../../services/coverages';

import TitleRow from '../shared/TitleRow';
import icon from "../../images/stacked_icon_lg.svg"
import PolicyCoverages from "../../components/bind-online/quoteReview/PolicyCoverages"
import Vehicles            from "./quoteReview/Vehicles";



function Coverages({ t, match }) {
  const dispatch = useDispatch()
  const vehiclesData = useSelector(state => state.data.quote.vehicles.map( vehicle => {
      const { id, coverages = [] } = vehicle
      return { id, coverages, displayTitle: vehicleTitle(vehicle) }
    })
  )

  const allCars = useSelector((state) => state.data.quote.vehicles )

  const quote = useSelector(state => state.data.quote)
  const bolStatus = useSelector(state => state.bol.status)
  const [vehicles, setVehicles] = useState(vehiclesData)
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


  const coveragesOptions = Object.keys(policyCoverages).map(item => ({value: item, label: item}))

  function addPolicyCoverages(values) {
    const coveragePackage = values[0].value
    const newVehicles = vehicles.map(vehicle => replacePolicyCoverages(vehicle, coveragePackage))
    setVehicles(newVehicles)
  }

  function updateVehicleCoverages(values, id) {
    const coveragePackage = values[0].value
    const vehicle = vehicles.find(item => item.id === id)
    const updatedVehicle = replaceVehicleCoverages(vehicle, coveragePackage)
    setVehicles(prevVehicles => arrayUpdateItemById(prevVehicles, updatedVehicle))
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(updateCoverageForVehicles(vehicles))
  }

  return (
    <Container>
      <TitleRow title={"Review your coverage."} subtitle={"You can review your Basic Coverage option below. "} />
      
      <Row className="d-flex justify-content-center align-items-center">
        
        { /** header */}
        <Col lg={6} className={"d-flex flex-column justify-content-start align-items-center bg-white shadow-sm py-4"}>
          <div className="d-flex">
          <Image src={icon} />
          <div className="ml-3">
            <p className="m-0"><strong>Basic Coverage&nbsp;</strong><button style={{color:"#F16322"}} type="button" className="p-0 btn btn-link">(Edit Coverage)</button></p>
            <p className="m-0">Coverage applies to all drivers and vehicles on your policy</p>
          </div>
        </div>
        </Col>
   
      </Row>
      { /** coverages policy level */}
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg={6} className={"d-flex flex-column justify-content-start align-items-center"}>
          <PolicyCoverages quote={quote} showEybrowUi={false} />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col sm={6} className="justify-content-center">
          <Vehicles vehicles={allCars} displayCoverageSelector={false} forceShowEditUi={true} />
        </Col>
      </Row>

          
      
    </Container>
  )
}

export default withTranslation(['vehicles'])(Coverages)
