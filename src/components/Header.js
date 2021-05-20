import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/insureOnlineLogo.svg";
import { withTranslation } from "react-i18next";
import progressBarRoutes from "../progress-bar-routes";
import PhoneNumberLink from "./shared/PhoneNumberLink";
import { ReactComponent as PhoneIcon } from "../images/phone-icon.svg";
import { Helmet } from "react-helmet"
import LanguageSelector from './LanguageSelector'
import { connect } from "react-redux"
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
        EMBED_TOKEN: process.env.REACT_APP_EMBED_TOKEN,
        ASSETS_URL: process.env.REACT_APP_ASSETS_URL,
        onload: function() {
    
          window.HappyFoxChat = this
          // const { first_name, last_name, email } = this.props.userInfo[0]

          // const customFields = {
          //   name: first_name.length && `${first_name} ${last_name}`,
          //   email: email.length && email
          // }

          const customFields = {
            name: "poop",
            email: "poop@gmail.com"
          }

          window.HappyFoxChat.setVisitorInfo(customFields, function(err, resp) {
            if (err) {
              console.error('Failed to set visitor details. Error:', err);
            } else {
              console.log('Added visitor details:', resp);
            }
          });

          window.HappyFoxChat.getVisitorInfo(function(err, resp) {
            if(err) {
              console.error('Failed to set visitor details. Error:', err);
            } else {
              console.log('Got visitor info:', resp);
            }
          });
        }
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
    return <>
      {this.state.chat && process.env.NODE_ENV !== "development" && <Chat />}
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

            <div className="d-none d-sm-block d-md-flex align-items-center justify-content-center">
              <LanguageSelector />
              <div>
                <small className="mb-0">{t("header.title")}</small>
                <p className="h5 mb-0">
                  <PhoneNumberLink
                    number={t("header.phoneNumber")}
                    classes="text-dark"
                  />
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.data.quote.drivers.filter(driver => driver.policyholder)
  }
}

export default connect(mapStateToProps)(withTranslation(["common"])(Header));
