import React                from 'react';
import { Row, Col, Image }  from 'react-bootstrap';

import dlIcon               from '../../../images/dl_icon.svg';
import CarrierComponent     from '../../../components/rate/Carrier';



const PolicyDetails = ({carrier}) => {

  const mockDlLinks = [
    {
      text: "Download",
      url: "http://www.google.com"
    },
    {
      text: "Download",
      url: "http://www.google.com"
    },
    {
      text: "Download",
      url: "http://www.google.com"
    }
  ]


  return (
    <Row className="justify-content-center"> 
      <Col lg={6} className={"bg-white rounded shadow py-3 px-5"}>
        <Row>
          <CarrierComponent carrier={carrier} hasBorder={false}/>
          <Col className="border-top border-bottom py-3">
            <p><strong>Policy Number</strong></p>
            <p className="mb-0">RQS15894B3G</p>
          </Col>
          <Col className="border-top border-bottom py-3">
            <p><strong>Effective Date</strong></p>
            <p className="mb-0">01/12/2020 - 07/12/2020</p>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p><strong>Coverage Documents</strong></p>
            <p>ID card</p>
            <p>Policy overview</p>
            <p>Deck page</p>
          </Col>
          <Col className="py-3">
            <p>&nbsp;</p>
       
            {mockDlLinks.map((link, i) => { 
              return <p key={i+1}><Image src={dlIcon} />&nbsp;<a href={link.url} className="orange">DownLoad</a></p>
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PolicyDetails
