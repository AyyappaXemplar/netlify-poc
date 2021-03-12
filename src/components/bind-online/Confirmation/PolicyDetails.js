import React                from 'react';
import { Row, Col, Image }  from 'react-bootstrap';
import dlIcon               from '../../../images/dl_icon.svg';
import CarrierComponent     from '../../../components/rate/Carrier';
import * as dayjs           from 'dayjs';



const PolicyDetails = ({ carrier, documents, term, policy_number }) => {
  return (
    <Row className="justify-content-center">
      <Col lg={6} className={"bg-white rounded shadow py-3 px-5"}>
        <Row>
          <CarrierComponent carrier={carrier} hasBorder={false}/>

          <Col className="border-top border-bottom py-3">
            <p><strong>Policy Number</strong></p>
            <p className="mb-0">{policy_number}</p>
          </Col>
          <Col className="border-top border-bottom py-3">
            <p><strong>Effective Date</strong></p>
            <p className="mb-0">{dayjs(term.effective).format('DD/MM/YYYY')} - {dayjs(term.expires).format('DD/MM/YYYY')}</p>
          </Col>
        </Row>
        <Row>
          <Col>
          <p className="mt-3"><strong>Coverage Documents</strong></p>

          {documents.map((link, i) => { 
            return <div key={i + 1} className="py-3 d-flex justify-content-between">
              <p className="text-uppercase">{link.type.split('_').join(" ")}</p>
              <p key={i + 1} className="text-primary"><a href={link.url} className="text-primary"><Image src={dlIcon} />&nbsp;DownLoad</a></p>
            </div>
            })}

          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PolicyDetails
