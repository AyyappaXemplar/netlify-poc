import React                from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { withTranslation }  from 'react-i18next';
import History              from '../../history'
const CancelButton = ({ path, t }) => {
    
    const cancelSubmit = (event) => {
        event.preventDefault();
        History.push(path)
    }


    return (
        <Row className={"justify-content-center"}>
            <Col xs={12} md={5} className="d-flex justify-content-center">
               <Button variant="link" className={"text-dark"} onClick={(event)=>cancelSubmit(event)}> <u>{t("form.cancel")}</u></Button>
            </Col>
        </Row>
    )
}

export default withTranslation(['drivers'])(CancelButton)

