import React from "react";
import { Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/insureOnlineLogo.svg";
import { withTranslation } from "react-i18next";
import progressBarRoutes from "../progress-bar-routes";
import PhoneNumberLink from "./shared/PhoneNumberLink";
import { ReactComponent as PhoneIcon } from "../images/phone-icon.svg";
import FreshChat from "react-freshchat";

const freshChatToken = process.env.REACT_APP_FRESH_CHAT_TOKEN;

class Header extends React.Component {
  progressBar() {
    return progressBarRoutes.map((route, index) => (
      <Route path={route.path} key={index} render={route.render} />
    ));
  }

  freshChatOnInit(widget) {
    /* Use `widget` instead of `window.fcWidget`
    widget.user.setProperties({
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      phone: user.phoneNumber,
    })
  */
  }

  render() {
    const { t } = this.props;
    const progressBar = this.progressBar();

    return (
      <Container className="header-container">
        <Row className="align-items-center header-row">
          <Col
            xs={6}
            sm={6}
            lg={3}
            className="text-center text-sm-left my-2 my-md-0 header-brand"
          >
            <Logo className="logo" />
          </Col>

          <Col xs={{ order: 3, span: 12 }} lg={{ order: 0, span: 6 }}>
            {progressBar}
          </Col>

          <Col
            xs={6}
            sm={6}
            lg={3}
            className="header-contact text-center text-sm-right"
          >
            <div className="d-sm-none text-right">
              <PhoneNumberLink
                number={t("header.phoneNumber")}
                classes="text-dark"
              >
                <PhoneIcon height="24px" width="24px" />
              </PhoneNumberLink>
            </div>

            <div className="d-none d-sm-block">
              <small className="mb-0">{t("header.title")}</small>
              <p className="h5 mb-0">
                <PhoneNumberLink
                  number={t("header.phoneNumber")}
                  classes="text-dark"
                />
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation(["common"])(Header);
