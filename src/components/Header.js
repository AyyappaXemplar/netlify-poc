import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/insureOnlineLogo.svg";
import { withTranslation } from "react-i18next";
import progressBarRoutes from "../progress-bar-routes";
import PhoneNumberLink from "./shared/PhoneNumberLink";
import { ReactComponent as PhoneIcon } from "../images/phone-icon.svg";
import { Helmet } from "react-helmet"
class Header extends React.Component {
  
  constructor() {
    super()
    this.state = {
      chat: false
    }
  }
  progressBar() {
    return progressBarRoutes.map((route, index) => (
      <Route path={route.path} key={index} render={route.render} />
    ));
  }

 
  componentDidMount(){
   
    if (typeof window !== `undefined`) {
        
      window.HFCHAT_CONFIG = {
        EMBED_TOKEN: '999cd250-875a-11eb-9669-6fc7a3f61b09',
        ASSETS_URL: `https://widget.happyfoxchat.com/v2/visitor`
      }
      this.setState((prevState) => { return {...prevState, chat: true} })
    }
  }

  render() {
    const { t } = this.props;
    const progressBar = this.progressBar();
    const Chat = () => {
      return <Helmet><script async={true} src={`${window.HFCHAT_CONFIG.ASSETS_URL}/js/widget-loader.js`}></script></Helmet>
      }
    return (
      <Container className="header-container">
        {this.state.chat && <Chat></Chat>}
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
