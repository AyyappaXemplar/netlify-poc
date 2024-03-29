import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/insureOnlineLogo.svg";
import { withTranslation } from "react-i18next";
import progressBarRoutes from "../progress-bar-routes";
import PhoneNumberLink from "./shared/PhoneNumberLink";
import { ReactComponent as PhoneIcon } from "../images/phone-icon.svg";
import { Helmet } from "react-helmet"
// import LanguageSelector from './LanguageSelector'
import initChat from './shared/initChat'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.initChat = initChat
    this.state = {
      chat: process.env.NODE_ENV !== 'development',
    }
    this.baseUrl = process.env.REACT_APP_WEB_HOME_URL;
  }

  progressBar() {
    return progressBarRoutes.map((route, index) => (
      <Route path={route.path} key={index} render={route.render} />
    ));
  }

  componentDidMount(){
    this.initChat()
    this.setState((prevState) => { return { ...prevState, chat: true } })
  }

  render() {

    const { t } = this.props;
    const progressBar = this.progressBar();
    const Chat = () => {
      return <Helmet><script async={true} src={`${process.env.REACT_APP_ASSETS_URL}/js/widget-loader.js`}></script></Helmet>
      }
    return <>
     { this.state.chat && <Chat /> }
      <Container className="header-container">
        <Row className="align-items-center header-row">
          <Col
            xs={6}
            sm={6}
            lg={3}
            className="text-center text-sm-left my-2 my-md-0 header-brand"
          >
            <a href={this.baseUrl}><Logo className="logo" /></a>
          </Col>

          <Col xs={{ order: 3, span: 12 }} lg={{ order: 0, span: 6 }}>
            <Switch>
              {progressBar}
            </Switch>
          </Col>

          <Col
            xs={6}
            sm={6}
            lg={3}
            className="header-contact text-center text-sm-right"
          >
            <div className="d-flex justify-content-end align-items-md-center">
              {/* <LanguageSelector /> */}
              <div>
                <div className="d-block d-md-none">
                  <PhoneNumberLink number={t("header.phoneNumber")} classes="text-dark">
                    <PhoneIcon height="24px" width="24px" />
                  </PhoneNumberLink>
                </div>
                <div className="d-none d-md-block text-dark">
                  <small className="mb-0">{t("header.title")}</small>
                  <p className="h5 mb-0">
                    <PhoneNumberLink number={t("header.phoneNumber")} classes="text-dark" />
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  }
}


export default withTranslation(["common"])(Header);
