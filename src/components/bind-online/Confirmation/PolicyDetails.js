import React                from 'react';
import { Row, Col }  from 'react-bootstrap';
import { ReactComponent as DownloadlIcon }   from '../../../images/dl_icon.svg';
import CarrierComponent     from '../../../components/rate/Carrier';
import getDate from '../../../services/timestamps';

const PolicyDetails = ({ carrier, document, term, policy_number }) => {
  const displayedDocumentLink = { download: document.url, preview: document.url.replace('&isattachment=true', '')}

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
            <p className="mb-0">{getDate(term.effective, 'MM/DD/YYYY')} - {getDate(term.expires, 'MM/DD/YYYY')}</p>
          </Col>
        </Row>
        <Row>
          <Col>
          <p className="mt-3"><strong>Coverage Documents</strong></p>
            <div className="py-3 d-flex justify-content-between">
              <p className="text">Policy Documents</p>
              <p>
                <span className="mr-2"><a href={displayedDocumentLink.preview} className="text-primary" rel="noopener noreferrer" target="_blank">Preview</a></span>
                <span><a href={displayedDocumentLink.download} className="text-primary"><DownloadlIcon/>Download</a></span>
              </p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PolicyDetails
