import React from "react"
import { Route } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { ReactComponent as Logo } from "../images/logo.svg"
import { withTranslation } from "react-i18next"
import progressBarRoutes from "../progress-bar-routes"
import PhoneNumberLink from "./shared/PhoneNumberLink"
import FreshChat from "react-freshchat"

const freshChatToken = process.env.REACT_APP_FRESH_CHAT_TOKEN

class Header extends React.Component {
  progressBar() {
    return progressBarRoutes.map((route, index) => (
      <Route path={route.path} key={index} render={route.render} />
    ))
  }

  render() {
    const { t } = this.props
    const progressBar = this.progressBar()

    return (
      <Container className="header-container">
        <Row className="align-items-center header-row">
          <Col
            xs={12}
            sm={6}
            lg={3}
            className="text-center text-sm-left my-3 my-sm-0"
          >
            <Logo className="logo" />
          </Col>
          <Col xs={{ order: 3, span: 12 }} lg={{ order: 0, span: 6 }}>
            {progressBar}
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={3}
            className="header-contact text-center text-sm-right"
          >
            <small className="mb-0">{t("header.title")}</small>

            <p class="h5 mb-0">
              <PhoneNumberLink
                number={t("header.phoneNumber")}
                classes="text-dark"
              />
            </p>
          </Col>
        </Row>
        <div className="chat-container">
          <FreshChat
            token={freshChatToken}
            email="user@email.com"
            first_name="..."
            onInit={(widget) => {
              /* Use `widget` instead of `window.fcWidget`
            widget.user.setProperties({
              email: user.email,
              first_name: user.firstName,
              last_name: user.lastName,
              phone: user.phoneNumber,
            })
          */
            }}
          />
        </div>
      </Container>
    )
  }
}

export default withTranslation(["common"])(Header)
