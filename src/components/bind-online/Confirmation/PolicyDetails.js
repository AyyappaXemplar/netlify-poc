import React                from 'react';
import { Row, Col, Image }  from 'react-bootstrap';
import { useSelector }      from 'react-redux'
import dlIcon               from '../../../images/dl_icon.svg';
import CarrierComponent     from '../../../components/rate/Carrier';
import getDate              from '../../../services/timestamps'


const PolicyDetails = ({quote}) => {

  const { carrier } = useSelector(redux => redux.data);
  const { documents, term } =  useSelector(redux => redux.data)
 
  return (
    <Row className="justify-content-center"> 
      <Col lg={6} className={"bg-white rounded shadow py-3 px-5"}>
        <Row>
          <CarrierComponent carrier={carrier[0]} hasBorder={false}/>
          <Col className="border-top border-bottom py-3">
            <p><strong>Policy Number</strong></p>
            <p className="mb-0">RQS15894B3G</p>
          </Col>
          <Col className="border-top border-bottom py-3">
            <p><strong>Effective Date</strong></p>
            <p className="mb-0">{getDate(term.effective)} to {getDate(term.expiration)}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            {documents.map((link, i) => { 
              return <div key={i+1 } className="py-3 d-flex justify-content-between"> <p>{link.type}</p><p key={i+1}><Image src={dlIcon} />&nbsp;<a href={link.url} className="orange">DownLoad</a></p></div>
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PolicyDetails
